import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr3e3IyyCE_cAPCWg5gKfCveKyEd5e87c",
  authDomain: "infouniforme.firebaseapp.com",
  projectId: "infouniforme",
  storageBucket: "infouniforme.firebasestorage.app",
  messagingSenderId: "754629371387",
  appId: "1:754629371387:web:b9c7f60120d92c8396d75e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
