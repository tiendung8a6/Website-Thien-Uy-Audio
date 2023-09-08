import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCbSLqeYcpLbelOPrJVxmPQvAPnKUWy14",
  authDomain: "ecommerce-bdf98.firebaseapp.com",
  projectId: "ecommerce-bdf98",
  storageBucket: "ecommerce-bdf98.appspot.com",
  messagingSenderId: "171919899530",
  appId: "1:171919899530:web:ae4b7b58f17b7398e26673",
  measurementId: "G-4PV55SEFZ8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
