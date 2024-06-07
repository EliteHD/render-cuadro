// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlK0RjlDE-qA6Ewl5PU-2ooG19ktxPt2c",
  authDomain: "cuadronecesidades.firebaseapp.com",
  projectId: "cuadronecesidades",
  storageBucket: "cuadronecesidades.appspot.com",
  messagingSenderId: "101063875282",
  appId: "1:101063875282:web:604f28c5be60a3ca83eb0b",
  measurementId: "G-MPC8XH1J8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, auth, storage };
