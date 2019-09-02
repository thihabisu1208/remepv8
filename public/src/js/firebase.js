// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCrV8lbX990kMXjJ37gBPnkAmNqJUmuIrM",
    authDomain: "remap-57234.firebaseapp.com",
    databaseURL: "https://remap-57234.firebaseio.com",
    projectId: "remap-57234",
    storageBucket: "remap-57234.appspot.com",
    messagingSenderId: "174382682148",
    appId: "1:174382682148:web:60d72b5b7d99ea8b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make Auth and Firebase References
const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();
const functions = firebase.functions();