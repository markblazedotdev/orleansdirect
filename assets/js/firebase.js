// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAjiuCDvDoh2Ov5cGKyo0VDHvCJhNvahI",
  authDomain: "orleansdirect-beta.firebaseapp.com",
  projectId: "orleansdirect-beta",
  storageBucket: "orleansdirect-beta.firebasestorage.app",
  messagingSenderId: "76324702604",
  appId: "1:76324702604:web:bc51d574486e5db5f62ea9",
  measurementId: "G-LRGGSEJD0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);