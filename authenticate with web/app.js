//------------------------------------------import--------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set, onValue   } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
//------------------------------------------firebaseConfig------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyAboZ1prMgAdyDTGBGzejfRdR9D02aA7eQ",
  authDomain: "authenticationandweb.firebaseapp.com",
  projectId: "authenticationandweb",
  storageBucket: "authenticationandweb.appspot.com",
  messagingSenderId: "163844083015",
  appId: "1:163844083015:web:c260f6b936987a0682d062",
  measurementId: "G-F6YD8HRS8W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
//------------------------------------------id,s-----------------------------------------------------------
let want_register=document.getElementById("want_register")
let want_login=document.getElementById("want_login")
let register =document.getElementById("register")
let login =document.getElementById("login")
let signup_btn = document.getElementById("signup_btn")
let login_btn = document.getElementById("login_btn")
let login_password= document.getElementById("login_password")
let login_email= document.getElementById("login_email")
let register_email= document.getElementById('register_email')
let register_password= document.getElementById('register_password')
let name= document.getElementById('name')
let age= document.getElementById('age')

//------------------------------------------event listeners-------------------------------------------------
// want_register.addEventListener('click',function(){
//     registerOrLogin("register")
// })
signup_btn.addEventListener("click",registerUserInFirebase)
login_btn.addEventListener("click",loginUser)
//------------------------------------------functions-------------------------------------------------------
// window.onload=function(){
// register.style.display="none"
// login.style.display="none"
// }
// function registerOrLogin(e){
//     if (e=="register"){
//       register.style.display="block"
//     }
//     else{
//       login.style.display="block"
//     }
// }
function registerUserInFirebase() {
  // console.log();
  createUserWithEmailAndPassword(auth, register_email.value, register_password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      console.log(user.uid);
      set(ref(db,'user/' + user.uid), {
        username: name.value,
        email: register_email.value,
        age: age.value
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}
function loginUser(){
  signInWithEmailAndPassword(auth, login_email.value, login_password.value)
  .then((userCredential) => {
    // Signed in 
   
    const user = userCredential.user;
    console.log(user);
    window.location.href = 'web.html';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);

  });
}