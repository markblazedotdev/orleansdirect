import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

async function createTestRequest() {
  try {
    const docRef = await addDoc(collection(db, "requests"), {
      requestId: "auto_test",
      uid: "test_user_001",
      channel: "website",

      pickupAddress: "Walmart Innes",
      dropoffAddress: "456 Test Ave, Orleans, ON",
      itemsRequested: "Test order",

      distanceKm: 3.5,
      deliveryFee: 13.5,
      estimatedItemSubtotal: 15.0,
      estimatedTotal: 28.5,
      serviceFee: 0.0,

      status: "quoted",
      paymentStatus: "unpaid",

      createdAt: serverTimestamp(),
    });

    console.log("✅ Request written with ID:", docRef.id);
  } catch (error) {
    console.error("❌ Error writing request:", error);
  }
}

// TEMP: expose to window so we can trigger it
window.createTestRequest = createTestRequest;

export { app, db };
