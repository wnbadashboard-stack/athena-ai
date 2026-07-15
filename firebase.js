import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQQEY5a9Lyf0CHI6jXg-_mSsilobcdw68",
  authDomain: "athena-ai-55db9.firebaseapp.com",
  projectId: "athena-ai-55db9",
  storageBucket: "athena-ai-55db9.firebasestorage.app",
  messagingSenderId: "70801354571",
  appId: "1:70801354571:web:3bb22f707a04d1f31c82ce"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
