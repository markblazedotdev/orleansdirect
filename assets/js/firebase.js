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

const buildRequestRecord = (request = {}) => {
  const requestId =
    request.requestId ||
    `web_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return {
    requestId,
    uid: request.uid || null,
    channel: "website",
    pickupAddress: request.pickupAddress || "",
    dropoffAddress: request.dropoffAddress || "",
    itemsRequested: request.itemsRequested || "",
    distanceKm: request.distanceKm ?? null,
    deliveryFee: request.deliveryFee ?? null,
    estimatedItemSubtotal: request.estimatedItemSubtotal ?? null,
    estimatedTotal: request.estimatedTotal ?? null,
    serviceFee: request.serviceFee ?? 0,
    status: request.status || "initiated",
    paymentStatus: request.paymentStatus || "pending",
    sourcePath: request.sourcePath || window.location.pathname,
    sourceHash: request.sourceHash || window.location.hash || "",
    sourceSection: request.sourceSection || "unknown",
    createdAt: serverTimestamp(),
  };
};

async function createRequest(request = {}) {
  const requestRecord = buildRequestRecord(request);
  const docRef = await addDoc(collection(db, "requests"), requestRecord);

  console.log("✅ Request written with ID:", docRef.id);
  return { id: docRef.id, requestId: requestRecord.requestId };
}

window.orleansDirectFirebase = {
  createRequest,
};

export { app, db, createRequest };
