import { useSession, getSession } from "next-auth/react";
import Header from "../components/Header";
import moment from "moment";
//import {db} from "../../firebase.js";
import Order from "../components/Order";
import { useState, useEffect } from "react";
import { webAuth } from "../config/auth";
import { useRouter } from "next/router";

function Orders({ orders }) {
    const { data: session } = useSession();
    const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (window.location.hash) {
      webAuth.parseHash({ hash: window.location.hash }, function (
        err,
        authResult
      ) {
        if (err) {
          return console.log(err);
        }

        webAuth.client.userInfo(authResult.accessToken, function (err, user) {
          // get user info
          setUser(user);
        });
      });
    } else {
      if (user === null) {
        router.push("/");
      }
    }
  }, []);

  return (
    <div>
      <Header />
      {/*<div></div>*/}
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
            Your Orders
        </h1>

        {session ? (<h2>{orders.length} Orders</h2>) : (<h2>Please sign in to see your orders</h2>)}

        <div className="mt-5 space-y-4">
            {orders.map(({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order 
              key={id}
              id={id}
              amount={amount}
              amountShipping={amountShipping}
              items={items}
              timestamp={timestamp}
              images={images}
              />
            ))}
        </div>
      </main>
    </div>
  )
}

export default Orders;

//Basically its node.js
export async function getServerSideProps(context) {
    //Establish connection to Stripe
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    //Get users logged in credentials
    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }

    // Firebase db
    // const stripeOrders = await db
    //     .collection("users")
    //     .doc(session.user.email)
    //     .collection("orders")
    //     .orderBy("timestamp", "desc")
    //     .get();

    // Stripe db
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_Shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate().unix()),
            items: (await stripe.checkout.sessions.listLineItems(order.id, { limit: 100, })).data,}))
    );

    return {
        props: {
            orders,
        },
    };
}
