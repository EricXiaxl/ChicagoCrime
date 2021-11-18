import React from 'react';
import {render} from 'react-dom';
import App from './App'
import MyTheme from './Theme'
import "./assets/css/index.css"
import {FirebaseAppProvider} from 'reactfire'

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

render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
    </FirebaseAppProvider>,
    document.getElementById('root')
);

render(
    <MyTheme App={<App />}/>,
    document.getElementById("root"));