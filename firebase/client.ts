import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "interprep-50162.firebaseapp.com",
    projectId: "interprep-50162",
    storageBucket: "interprep-50162.firebasestorage.app",
    messagingSenderId: "740244611012",
    appId: "1:740244611012:web:4abc7937e89e75c5024e91",
    measurementId: "G-NN400BJ8NP"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) :getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
