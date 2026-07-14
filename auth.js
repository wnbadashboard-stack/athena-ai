import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("login");
const googleBtn = document.getElementById("google");
const createBtn = document.getElementById("create");

loginBtn.addEventListener("click", async () => {

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});

createBtn.addEventListener("click", async () => {

    try {

        await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});

googleBtn.addEventListener("click", async () => {

    try {

        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider);

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});
