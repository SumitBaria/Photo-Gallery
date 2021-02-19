import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyCbZmqL10Pz7ysRjbf1lVz9zo2wC7CHAF4",
  authDomain: "myphotobook-f86ff.firebaseapp.com",
  projectId: "myphotobook-f86ff",
  storageBucket: "myphotobook-f86ff.appspot.com",
  messagingSenderId: "1086449619923",
  appId: "1:1086449619923:web:f94d70b05cc2b03de09526",
  measurementId: "G-XHBDZGJQDQ",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
