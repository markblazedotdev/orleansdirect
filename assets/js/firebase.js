import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAjiuCDvDoh2Ov5cGKyo0VDHvCJhNvahI",
  authDomain: "orleansdirect-beta.firebaseapp.com",
  projectId: "orleansdirect-beta",
  storageBucket: "orleansdirect-beta.firebasestorage.app",
  messagingSenderId: "76324702604",
  appId: "1:76324702604:web:bc51d574486e5db5f62ea9",
  measurementId: "G-LRGGSEJD0T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase app initialized");
console.log("📦 Firestore ready");
console.log("Project ID:", firebaseConfig.projectId);

export { app, db };