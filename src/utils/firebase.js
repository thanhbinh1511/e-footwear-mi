import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAAJ2Gtxrb7eAQTYkwuCOGbTK2PwlZQeL4",
    authDomain: "fir-react-upload-92e9c.firebaseapp.com",
    projectId: "fir-react-upload-92e9c",
    storageBucket: "fir-react-upload-92e9c.appspot.com",
    messagingSenderId: "322652292836",
    appId: "1:322652292836:web:d744baa06be560d3da8ef1",
    measurementId: "G-GXNLXCJXY0"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };