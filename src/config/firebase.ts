// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC85JnTcp-FG2-h3rK-rN_socVa83BsMJE",
  authDomain: "react-course-2-4157f.firebaseapp.com",
  projectId: "react-course-2-4157f",
  storageBucket: "react-course-2-4157f.appspot.com",
  messagingSenderId: "265939392831",
  appId: "1:265939392831:web:6c10c49e02227512c51b8a",
  measurementId: "G-54SQVM5YKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
