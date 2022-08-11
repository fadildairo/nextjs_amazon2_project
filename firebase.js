// Import the functions you need from the SDKs you need
//Saw format on Stackoverflow
import firebase from 'firebase';
//import 'firebase/compat/firestore';
// TODO:Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6UzFrOr8acd-m1qkovy-XlBuwAZSlycY",
  authDomain: "nextjs--project.firebaseapp.com",
  projectId: "nextjs-amazon-project",
  storageBucket: "nextjs-amazon-project.appspot.com",
  messagingSenderId: "690674103868",
  appId: "1:690674103868:web:98af4ffdd399011cb6f539"
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;