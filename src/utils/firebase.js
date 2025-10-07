// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration from your console
const firebaseConfig = {
  apiKey: "AIzaSyCvI0fzaBID1B3H6Sh57l9PxoyPnm90Gbw",
  authDomain: "namsan-bro.firebaseapp.com",
  projectId: "namsan-bro",
  storageBucket: "namsan-bro.firebasestorage.app",
  messagingSenderId: "54552252649",
  appId: "1:54552252649:web:6033603711fc0411fae078",
  measurementId: "G-7TK1D0FHBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);