   // ---------------------------------------import items------------------------------------------------------------
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
   import { getAuth, 
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
    onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    import {getFirestore,doc, setDoc  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
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
  let event_container= document.getElementById("event_container")
  success.style.display="none"    
  danger.style.display="none"     
  // login_div.style.display="none";
  // logout_container.style.display="none";
  login_div.style.display="none"
  // register_div.style.display="none"
     // ---------------------------------------confingration------------------------------------------------------------
     const firebaseConfig = {
        apiKey: "AIzaSyCd3Mq9mFjzYIfUv-RrNCT-57Z_DXscdvI",
        authDomain: "eventplanner-aa4d9.firebaseapp.com",
        databaseURL: "https://eventplanner-aa4d9-default-rtdb.firebaseio.com",
        projectId: "eventplanner-aa4d9",
        storageBucket: "eventplanner-aa4d9.appspot.com",
        messagingSenderId: "20868584077",
        appId: "1:20868584077:web:203297b2fd3ca9010108c4",
        measurementId: "G-S766E704S1"
      };
       // ---------------------------------------constants------------------------------------------------------------
    const app = initializeApp(firebaseConfig);
  const auth = getAuth();
//   const database = getDatabase(app);
  const db = getFirestore(app);
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
        const docRef  = doc(db, "user", );
        setDoc(docRef, {
            userName:userName,
            email:email.value
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
     
  event_container.style.display="block";
  login.style.display="none";
  // register_div.style.display="none";
  // danger.style.display="none"
  
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