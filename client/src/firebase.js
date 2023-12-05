import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOwKG6g1ctOQKLt4ZeX1bC7vkX9GctILk",
  authDomain: "thienuyaudio-1e259.firebaseapp.com",
  projectId: "thienuyaudio-1e259",
  storageBucket: "thienuyaudio-1e259.appspot.com",
  messagingSenderId: "720757308900",
  appId: "1:720757308900:web:a6f33b0418139378801bf1",
  measurementId: "G-ZZCF5BLGE1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
