import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRzBxn6Q5NJ5ft9_CmxUkqPQLTZD-6QzA",
  authDomain: "adventureplanner-f963e.firebaseapp.com",
  projectId: "adventureplanner-f963e",
  storageBucket: "adventureplanner-f963e.firebasestorage.app",
  messagingSenderId: "848285840325",
  appId: "1:848285840325:web:17c37414624b7f9729d1ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);