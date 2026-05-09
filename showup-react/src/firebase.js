// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Adăugat pentru baza de date

const firebaseConfig = {
  apiKey: "AIzaSyBs_UaU5aF6w_aE6Gwk7PK4K9w6ILB7xUk",
  authDomain: "showup2move-7178f.firebaseapp.com",
  projectId: "showup2move-7178f",
  storageBucket: "showup2move-7178f.firebasestorage.app",
  messagingSenderId: "1046178362801",
  appId: "1:1046178362801:web:382b7cdfcefd7ca9f1b990",
  measurementId: "G-9W6T182C6N"
};

// Initializează aplicația Firebase
const app = initializeApp(firebaseConfig);

// Initializează și EXPORTĂ baza de date ca să o putem folosi în restul aplicației
export const db = getFirestore(app);