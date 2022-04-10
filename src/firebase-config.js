import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5BDQ4j49X7jkqCrXM2khefKkQ-lRjytc",
  authDomain: "glints-f2206.firebaseapp.com",
  databaseURL: "https://glints-f2206-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "glints-f2206",
  storageBucket: "glints-f2206.appspot.com",
  messagingSenderId: "502249227719",
  appId: "1:502249227719:web:0e39a4d3647abc895dc5e2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);