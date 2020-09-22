import firebase from 'firebase';

const firebaseConfig =
{
    apiKey: "AIzaSyCvwRtUXu7WuvMSTFvAcIrcEFg3g1s0y1I",
    authDomain: "clone-7cd75.firebaseapp.com",
    databaseURL: "https://clone-7cd75.firebaseio.com",
    projectId: "clone-7cd75",
    storageBucket: "clone-7cd75.appspot.com",
    messagingSenderId: "382773188142",
    appId: "1:382773188142:web:2a0b6f6bc7971dea0171bf",
    measurementId: "G-DPLK9778FB",
};
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
const auth =firebase.auth();

export {db,auth};