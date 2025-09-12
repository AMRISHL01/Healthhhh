// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "studio-4584136097-9a1b7",
  appId: "1:630692456035:web:0d9a69c2d1d5b997a6fa56",
  storageBucket: "studio-4584136097-9a1b7.firebasestorage.app",
  apiKey: "AIzaSyBZbe-1Y940RuMHtiQ3SjkhbFTJ5C0kgSc",
  authDomain: "studio-4584136097-9a1b7.firebaseapp.com",
  messagingSenderId: "630692456035",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
