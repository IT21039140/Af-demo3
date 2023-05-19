// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCR7eOZ6S3DFe5xTw9rlX_dR6np-JA3iHQ",
    authDomain: "mealphoto-73cc0.firebaseapp.com",
    projectId: "mealphoto-73cc0",
    storageBucket: "mealphoto-73cc0.appspot.com",
    messagingSenderId: "229777200703",
    appId: "1:229777200703:web:481ae2a4701a48fed40a8a",
    //measurementId: "G-QPK2GG7V2B"
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Storage = getStorage(app);
export default Storage;