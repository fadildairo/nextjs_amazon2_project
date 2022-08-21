import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
//import Auth0Provider from "next-auth/providers/auth0";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js Amazon Passwordless'
    }),
  ]
})
