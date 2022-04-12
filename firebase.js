// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD9u3vknlOWMTO_8WiGsXN9VPXeuHXlTk",
  authDomain: "rn-insta-clone-59663.firebaseapp.com",
  projectId: "rn-insta-clone-59663",
  storageBucket: "rn-insta-clone-59663.appspot.com",
  messagingSenderId: "623407068296",
  appId: "1:623407068296:web:9b4b620c5ba42dc65ddb3d"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
!firebase.apps.length ?
firebase.initializeApp(firebaseConfig):firebase.app();
const db = firebase.firestore();
export  {firebase,db};