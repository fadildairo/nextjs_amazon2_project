import { buffer } from 'micro';
import * as admin from 'firebase-admin';


//Secure a connection to FIREBASE from the backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length
  ? admin.initializeApp({
       credential: admin.credential.cert(serviceAccount),
    }) 
: admin.app(); //Ternary Statement

//Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Stripe CLI webhook secret for testing endpoint locally.
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    //console.log('fulfilling order', session)

    return app
        .firestore()
        .collection('users')
        .document(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} is added to database`)
        })
};

export default async (req, res) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        //Verify that the EVENT posted came from Stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
          } catch (err) {
            return response.status(400).send(`Webhook Error: ${err.message}`);
          }

          //Handle the checkout.session.completed event
          if (event.type === "checkout.session.completed") {
              const session = event.data.object;

              //Fulfill the order
              return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
          }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}