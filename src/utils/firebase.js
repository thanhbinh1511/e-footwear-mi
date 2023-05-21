import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAAJ2Gtxrb7eAQTYkwuCOGbTK2PwlZQeL4",
    authDomain: "fir-react-upload-92e9c.firebaseapp.com",
    projectId: "fir-react-upload-92e9c",
    storageBucket: "fir-react-upload-92e9c.appspot.com",
    messagingSenderId: "322652292836",
    appId: "1:322652292836:web:d744baa06be560d3da8ef1",
    measurementId: "G-GXNLXCJXY0"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);