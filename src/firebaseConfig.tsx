// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk8HrjgD2XtA5LaXG9ARhCe1ZoJCyA7bo",
  authDomain: "barlivet.firebaseapp.com",
  projectId: "barlivet",
  storageBucket: "barlivet.appspot.com",
  messagingSenderId: "422470514657",
  appId: "1:422470514657:web:d9d4809083493d4f3bc4a0",
  measurementId: "G-75KENWKF71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app