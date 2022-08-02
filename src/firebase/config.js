// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJTYWwVYTrC9PIcS4AcBWna0TnY6GcIeU",
  authDomain: "petsos-af912.firebaseapp.com",
  projectId: "petsos-af912",
  storageBucket: "petsos-af912.appspot.com",
  messagingSenderId: "789671171466",
  appId: "1:789671171466:web:3e4a83b08771eea769e473"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseFirestoreLite = getFirestore(FirebaseApp);
