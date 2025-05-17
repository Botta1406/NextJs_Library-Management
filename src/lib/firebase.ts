// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBmcWL62_wn6I-Co9U55PJRf-QLbv3TG-s",
    authDomain: "library-20e28.firebaseapp.com",
    projectId: "library-20e28",
    storageBucket: "library-20e28.firebasestorage.app",
    messagingSenderId: "887310125845",
    appId: "1:887310125845:web:f209a7c7f8554988a5371c",
    measurementId: "G-EQDRCCG8BE"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export default app;