import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyC8v3EU2h8RrKfSM4uqFxATNIFglEDnmGQ",
  authDomain: "rnproject-d3470.firebaseapp.com",
  projectId: "rnproject-d3470",
  storageBucket: "rnproject-d3470.appspot.com",
  messagingSenderId: "621244496759",
  appId: "1:621244496759:web:1c111d18db0f44753fbf72",
  measurementId: "G-4108RHYWSE",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
