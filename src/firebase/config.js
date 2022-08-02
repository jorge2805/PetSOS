// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmFta5KBXjHEV8_AQGnaevhQBQNuBEx0c",
  authDomain: "react-practice-d61b2.firebaseapp.com",
  projectId: "react-practice-d61b2",
  storageBucket: "react-practice-d61b2.appspot.com",
  messagingSenderId: "846109872209",
  appId: "1:846109872209:web:9bc195fcc3d250f681e870"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseFirestoreLite = getFirestore(FirebaseApp);
