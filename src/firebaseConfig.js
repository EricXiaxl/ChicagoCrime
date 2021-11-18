// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXDYMTdJPjnahBpfZoqrxb8Zz6k2DqGyA",
  authDomain: "ca675-assignment2-9e40f.firebaseapp.com",
  databaseURL: "https://ca675-assignment2-9e40f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ca675-assignment2-9e40f",
  storageBucket: "ca675-assignment2-9e40f.appspot.com",
  messagingSenderId: "1066811822042",
  appId: "1:1066811822042:web:fe8447250470a4d8b1bae3",
  measurementId: "G-1N676R9D50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);