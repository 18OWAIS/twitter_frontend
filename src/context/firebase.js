
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "twitter-bddbd.firebaseapp.com",
  projectId: "twitter-bddbd",
  storageBucket: "twitter-bddbd.appspot.com",
  messagingSenderId: "821867954156",
  appId: "1:821867954156:web:2497dd2ac78ebdd8a18ac9",
  measurementId: "G-FN5F046VVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

