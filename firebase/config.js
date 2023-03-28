import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/react-native";
import "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
