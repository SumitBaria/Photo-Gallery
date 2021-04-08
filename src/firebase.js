import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB_wKL9WUvTL5JGWiaW25jxOPJlVHI5KSk",
  authDomain: "thephotobook-dc4c3.firebaseapp.com",
  projectId: "thephotobook-dc4c3",
  storageBucket: "thephotobook-dc4c3.appspot.com",
  messagingSenderId: "700524543123",
  appId: "1:700524543123:web:324d0f95768a3ea86da166",
};

const fireabseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();

export { storage, db, auth, provider };
