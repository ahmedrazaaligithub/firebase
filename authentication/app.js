   // ---------------------------------------import items------------------------------------------------------------
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
 import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getDatabase,ref, set,update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
   // ---------------------------------------id,s------------------------------------------------------------
  let loader=document.getElementById("loader")
  let selectLogin= document.getElementById("selectLogin")
  let selectRegister= document.getElementById("selectRegister")
  let select= document.getElementById("select")
  let login_div = document.getElementById("login_div")
  let register_div =document.getElementById("register_div")
  let alreadyLogin = document.getElementById("alreadyLogin")
  let logout_container = document.getElementById("logout_container")
 let register_btn=document.getElementById("register_btn")
 let logout=document.getElementById("logout") 
 let email=document.getElementById("email")
 let password=document.getElementById("password")
 let userName = document.getElementById("userName")
 let email_log=document.getElementById("email_log")
let password_log=document.getElementById("password_log")
 let login_btn=document.getElementById("login_btn")
 let linkReg = document.getElementById("linkReg")
let success=document.getElementById("success")             
let  danger=document.getElementById("danger")
success.style.display="none"    
danger.style.display="none"     
// login_div.style.display="none";
// logout_container.style.display="none";
login_div.style.display="none"
// register_div.style.display="none"
   // ---------------------------------------confingration------------------------------------------------------------
  const firebaseConfig = {
    apiKey: "AIzaSyDrLFht2agsqvN5iwrdWeM7BF0Uh8A_5EE",
    authDomain: "authentication-58683.firebaseapp.com",
    projectId: "authentication-58683",
    storageBucket: "authentication-58683.appspot.com",
    messagingSenderId: "471770690163",
    appId: "1:471770690163:web:a045666e8f182516af7006",
    measurementId: "G-ZLS46LB8B0"
  };
     // ---------------------------------------constants------------------------------------------------------------
  const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const db= getDatabase();
   // ---------------------------------------event listeneres------------------------------------------------------------
register_btn.addEventListener("click",registeruser)
login_btn.addEventListener("click",loginUser)
selectLogin.addEventListener("click",function() {
  // Event listener function with parameters
  regme("login");
}



)
selectRegister.addEventListener("click",function() {

  regme("register");
})
alreadyLogin.addEventListener("click",redirect)



   // ---------------------------------------functions------------------------------------------------------------
   window.onload = function() {
register_div.style.display="none"
    login_div.style.display = "none";
  };
   const regme=((e)=>{
if(e=="register"){
register_div.style.display="block"
select.style.display="none"
}else{
  login_div.style.display="block"
select.style.display="none"
}

})
function redirect(){
  login_div.style.display="block"
  register_div.style.display="none"
  success.style.display="none"
  danger.style.display="none"
}
onAuthStateChanged(auth, (user) => {
  if (user) {
   
    const uid = user.uid;
    console.log(uid);
  } else {

  }
});
function registeruser(){
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      set(ref(db, 'users/' + user.uid), {
        name:userName.value,
         email:email.value,
       }); 
  danger.style.display="none"
  success.style.display="block"
  success.innerHTML="User Registered successfully <i class='fa-solid fa-check text-success'></i>"

    

    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message;
      success.style.display="none"  
      // console.log(errorMessage);
      danger.style.display="block"
  danger.innerHTML=`${errorMessage} <i class='fa-solid fa-xmark text-danger'></i>`;
    });
}
function loginUser(){
  signInWithEmailAndPassword(auth, email_log.value, password_log.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
// logout_container.style.display="block";
// register_div.style.display="none";
// danger.style.display="none"

window.open('./web');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    success.style.display="none"
    danger.style.display="block"
danger.innerHTML= `incorrect email or password <i class='fa-solid fa-xmark text-danger'></i>`

  });
  
}
// function logoutUser() {
//   signOut(auth).then(() => {
//     console.log(auth);
//     // login_div.style.display="none"
//     logout_container.style.display="none"
//       // Sign-out successful.
//   }).catch((error) => {
//       // An error happened.
// console.log(error);
//   });
// }