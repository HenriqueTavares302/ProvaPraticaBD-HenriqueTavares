import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd5D33_YPDKp6LS2zq7pIArKBYRWbB618",
  authDomain: "provapratica-bd.firebaseapp.com",
  projectId: "provapratica-bd",
  storageBucket: "provapratica-bd.firebasestorage.app",
  messagingSenderId: "1076751522483",
  appId: "1:1076751522483:web:d412b31f39ffc4bbb7aec6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);