import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");

async function checkPremium(user) {

  const premiumRef = doc(db, "premiumUsers", user.email);

  const premiumSnap = await getDoc(premiumRef);

  if (premiumSnap.exists()) {

    const data = premiumSnap.data();

    if (data.premium === true) {

      window.location.href = "dashboard.html";

    } else {

      window.location.href =
        "https://buy.stripe.com/cNieVcfKo5IddJMfxh6AM03";

    }

  } else {

    window.location.href =
      "https://buy.stripe.com/cNieVcfKo5IddJMfxh6AM03";

  }

}

/* ---------------- LOGIN ---------------- */

if (loginBtn) {

  loginBtn.onclick = async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Enter email and password.");
      return;
    }

    try {

      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await checkPremium(cred.user);

    } catch (err) {

      alert(err.message);

    }

  };

}

/* ---------------- SIGNUP ---------------- */

if (signupBtn) {

  signupBtn.onclick = async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Enter email and password.");
      return;
    }

    try {

      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "premiumUsers", email), {

        premium: false,
        plan: "free",
        created: serverTimestamp()

      });

      window.location.href =
        "https://buy.stripe.com/cNieVcfKo5IddJMfxh6AM03";

    } catch (err) {

      alert(err.message);

    }

  };

}
