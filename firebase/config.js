// import firebase from "firebase";
// import "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxfx410kDBcjlnNvrF7gjFLxMSjdZbgeg",
  authDomain: "mynewproject-34652.firebaseapp.com",
  projectId: "mynewproject-34652",
  storageBucket: "mynewproject-34652.appspot.com",
  messagingSenderId: "527477593648",
  appId: "1:527477593648:web:ad6a3d1f468323f334bff5",
  measurementId: "G-1RQTRB8JJL",
};

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const auth = getAuth(app);
// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

export { auth };
