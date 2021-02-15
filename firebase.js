import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYbR1oouF0Vzfvl8uI7gSwvlTJKwh6MBE",
    authDomain: "signal-clone-bab00.firebaseapp.com",
    projectId: "signal-clone-bab00",
    storageBucket: "signal-clone-bab00.appspot.com",
    messagingSenderId: "352833605038",
    appId: "1:352833605038:web:adfb6c59cea1bf352dcc3f",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };