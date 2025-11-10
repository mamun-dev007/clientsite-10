// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK3fnjHlSAu7lN_M1oeGHYfgbcmvaxkXk",
  authDomain: "habit-tracker-b99f9.firebaseapp.com",
  projectId: "habit-tracker-b99f9",
  storageBucket: "habit-tracker-b99f9.firebasestorage.app",
  messagingSenderId: "647401147479",
  appId: "1:647401147479:web:e5bdb15a2a393d5891e712"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;