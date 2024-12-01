// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjURKcjwp2uYe3MFbIZFEfx1DpmAuwr0A",
  authDomain: "culteau.firebaseapp.com",
  databaseURL: "https://culteau-default-rtdb.firebaseio.com",
  projectId: "culteau",
  storageBucket: "culteau.firebasestorage.app",
  messagingSenderId: "632954485639",
  appId: "1:632954485639:web:eac477fce6bae178f8f122",
  measurementId: "G-2LX1JC8DDQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
