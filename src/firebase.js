// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKpPo6CPcb0Ikp9O6uTBzKsAYWJLsLXbs",
  authDomain: "firstpro-313c1.firebaseapp.com",
  projectId: "firstpro-313c1",
  storageBucket: "firstpro-313c1.appspot.com",
  messagingSenderId: "540072000717",
  appId: "1:540072000717:web:6ac20893f8e0b35390fd84"
  // ❌ Removed measurementId (analytics not needed for now)
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
export const db = getFirestore(app);