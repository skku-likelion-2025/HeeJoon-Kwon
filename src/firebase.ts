import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqSKubbToqnmHU14O0Qaj9BGt5FB7LyVI",
  authDomain: "nwitter-reloaded-dfcd4.firebaseapp.com",
  projectId: "nwitter-reloaded-dfcd4",
  storageBucket: "nwitter-reloaded-dfcd4.firebasestorage.app",
  messagingSenderId: "610814837164",
  appId: "1:610814837164:web:a50ab1dd8c0fd146a0fa09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
/* auth is Firebase Auth instance that gives you access to Firebase Authentication functions and services. By giving this as the first argument, you're connecting to Firebase's Auth API behind the scenes, through that auth instance. */
export const db = getFirestore(app);