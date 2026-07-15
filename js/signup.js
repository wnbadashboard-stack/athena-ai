// =====================================
// ATHENA SIGNUP
// Sprint 26
// =====================================

import { auth } from "./firebase.js";

import {

    createUserWithEmailAndPassword,
    updateProfile

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const signupButton = document.getElementById("signup");

signupButton.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {

        alert("Please complete all fields.");

        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }

    try {

        const userCredential = await createUserWithEmailAndPassword(

            auth,
            email,
            password

        );

        await updateProfile(userCredential.user, {

            displayName: name

        });

        alert("Welcome to Athena!");

        window.location.href = "dashboard.html";

    }

    catch (error) {

        alert(error.message);

        console.error(error);

    }

});
