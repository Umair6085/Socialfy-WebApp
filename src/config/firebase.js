import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIuEoPZH8xupJUwprQiAfMRjZNcAyJtm0",
  authDomain: "practice-1-de8ce.firebaseapp.com",
  projectId: "practice-1-de8ce",
  storageBucket: "practice-1-de8ce.appspot.com",
  messagingSenderId: "871582186702",
  appId: "1:871582186702:web:c62dc547a1ce11ff31a49f",
  measurementId: "G-6V620VZ09H"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);