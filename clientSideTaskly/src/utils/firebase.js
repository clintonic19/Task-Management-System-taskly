// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskly-8e070.firebaseapp.com",
  projectId: "taskly-8e070",
  storageBucket: "taskly-8e070.appspot.com",
  messagingSenderId: "529571977761",
  appId: "1:529571977761:web:de14f42f7ce19e7faea160"
};

// Initialize Firebase & EXPORT
export const app = initializeApp(firebaseConfig);