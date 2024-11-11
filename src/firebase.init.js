// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzA_XmH6me-GyK_sh4GLMYjeYFUoMexwk",
  authDomain: "email-password-auth-583da.firebaseapp.com",
  projectId: "email-password-auth-583da",
  storageBucket: "email-password-auth-583da.firebasestorage.app",
  messagingSenderId: "191150261496",
  appId: "1:191150261496:web:60568c95392d610f7a270d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 export default auth;