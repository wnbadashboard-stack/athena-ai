import { auth } from "./firebase.js";

import { signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const welcome = document.getElementById("welcome");

if (auth.currentUser) {

    welcome.innerHTML =
    "Welcome back,<br>" +
    auth.currentUser.email;

}

document.getElementById("optimizer").onclick = () => {

    window.location.href = "optimizer.html";

};

document.getElementById("research").onclick = () => {

    window.location.href = "research.html";

};

document.getElementById("lineups").onclick = () => {

    window.location.href = "lineups.html";

};

document.getElementById("news").onclick = () => {

    window.location.href = "news.html";

};

document.getElementById("account").onclick = () => {

    window.location.href = "account.html";

};

document.getElementById("logout").onclick = async () => {

    await signOut(auth);

    window.location.href = "index.html";

};
