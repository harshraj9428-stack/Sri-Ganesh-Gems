import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBg_mawzVfuR_R4V3iqPtMspOd_mPsxSqI",
  authDomain: "sri-ganesh-gems.firebaseapp.com",
  projectId: "sri-ganesh-gems",
  storageBucket: "sri-ganesh-gems.firebasestorage.app",
  messagingSenderId: "151261947487",
  appId: "1:151261947487:web:ef59abc844036c26015dea",
  measurementId: "G-7Y49PF4E1W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { db, storage, auth, analytics };
