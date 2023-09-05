import * as firebase from "firebase";

// Your web app's Firebase configuration
// const firebaseConfig ={ 
//   apiKey:"AIzaSyBs0Tzjg_10epR0uxE7yYS5FEGXobkKl1w", 
//   authDomain:"ecommerce-cc3f3.firebaseapp.com", 
//   projectId:"ecommerce-cc3f3", 
//   storageBucket:"ecommerce-cc3f3.appspot.com", 
//   messagingSenderId:"212186369843", 
//   appId:"1:212186369843:web:3da7f302727962c1cc3846", 
//   measurementId:"G-KV2C75GEYC" 
// };
const firebaseConfig = {
  apiKey: "AIzaSyBGh76LQZw8KtFyNFm-82z6utI2sjgQVe8",
  authDomain: "webecm-2cc4a.firebaseapp.com",
  projectId: "webecm-2cc4a",
  storageBucket: "webecm-2cc4a.appspot.com",
  messagingSenderId: "162775489435",
  appId: "1:162775489435:web:8ff0cda6df6467bf549f3e",
  measurementId: "G-WRHDSHF698"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
