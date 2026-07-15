import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");

async function checkPremium(user){

    const premiumRef = doc(db,"premiumUsers",user.email);

    const premiumSnap = await getDoc(premiumRef);

    if(!premiumSnap.exists()){

        window.location.href="https://buy.stripe.com/cNieVcfKo5IddJMfxh6AM03";
        return;

    }

    const data = premiumSnap.data();

    if(data.premium===true){

        window.location.href="dashboard.html";

    }else{

        window.location.href="https://buy.stripe.com/cNieVcfKo5IddJMfxh6AM03";

    }

}

if(loginBtn){

loginBtn.onclick = async()=>{

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    try{

        const cred=await signInWithEmailAndPassword(auth,email,password);

        await checkPremium(cred.user);

    }catch(err){

        alert(err.message);

    }

};

}

if(signupBtn){

signupBtn.onclick = async()=>{

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    try{

        const cred=await createUserWithEmailAndPassword(auth,email,password);

        await checkPremium(cred.user);

    }catch(err){

        alert(err.message);

    }

};

}
