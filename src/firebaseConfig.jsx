// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRV-gFvqA74HA5f3mpggDCWpxQ6yvQsNg",
    authDomain: "fa-traditions.firebaseapp.com",
    projectId: "fa-traditions",
    storageBucket: "fa-traditions.firebasestorage.app",
    messagingSenderId: "1049202572378",
    appId: "1:1049202572378:web:47c4eeb54e026afd35ec63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, collection, addDoc, auth };
