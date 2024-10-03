// ========================================imports==================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ========================================config==================================================
const firebaseConfig = {
  apiKey: "AIzaSyBnUtE0zBddquXb9MYWr9u7Ht4sJgAizFY",
  authDomain: "storetodo-4d230.firebaseapp.com",
  databaseURL: "https://storetodo-4d230-default-rtdb.firebaseio.com",
  projectId: "storetodo-4d230",
  storageBucket: "storetodo-4d230.appspot.com",
  messagingSenderId: "604691194877",
  appId: "1:604691194877:web:8d66577b99440c01b0ef94",
  measurementId: "G-VRV5WM68BB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

console.log(app);
// ========================================id,s==================================================
let selectLogin= document.getElementById("selectLogin")
  let selectRegister= document.getElementById("selectRegister")
  let select= document.getElementById("select")
  let login_div = document.getElementById("login_div")
  let register_div =document.getElementById("register_div")
  let alreadyLogin = document.getElementById("alreadyLogin")
  let logout_container = document.getElementById("logout_container")
 let register_btn=document.getElementById("register_btn")
 let email=document.getElementById("email")
 let password=document.getElementById("password")
 let userName = document.getElementById("userName")
 let email_log=document.getElementById("email_log")
let password_log=document.getElementById("password_log")
 let login_btn=document.getElementById("login_btn")
 let linkReg = document.getElementById("linkReg")
let success=document.getElementById("success")             
let  danger=document.getElementById("danger")
let todos = document.getElementById("todos")
let logout = document.getElementById("logout")
let todoInput= document.getElementById("todoInput")
let todoList= document.getElementById("todoList")
let addTodo= document.getElementById("addTodo")
let list = document.getElementById("list")
// ========================================events====================================================
todos.style.display="none"

register_btn.addEventListener("click",registeruser)
login_btn.addEventListener("click",loginUser)
logout.addEventListener("click",logoutUser)
addTodo.addEventListener("click",addTodos)

// ========================================functions==================================================

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    login_div.style.display="block"
    register_div.style.display="none"
// todos.style.display="none"
  } else {
    login_div.style.display="none"
    register_div.style.display="block"
todos.style.display="none"
  }
});
function registeruser(){
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      


    

    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message;
    
    });
}
function loginUser(){
  signInWithEmailAndPassword(auth, email_log.value, password_log.value)
  .then((userCredential) => {

    const user = userCredential.user;
   
todos.style.display="block"
login_div.style.display="none"
getTodo()

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   

  });
  
}
async function addTodos(){
 try {
  const docRef = await addDoc(collection(db, "UsersTodo"), {
    todo:todoInput.value
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

}

async function getTodo(){
  const querySnapshot = await getDocs(collection(db, "UsersTodo"));
  list.innerHTML=null
querySnapshot.forEach((doc) => {
  
  console.log(`${Object.values(doc.data())}  `);
list.innerHTML+=`<li> ${Object.values(doc.data())} <button class="mx-3">edit</button><button class="delete" >delete</button> </li>`

});
}

 
  // del.addEventListener("click",function(){
  //   console.log('this');
  // })


function logoutUser() {
  signOut(auth).then(() => {
    console.log(auth);
    // login_div.style.display="none"
    // logout_container.style.display="none"
      // Sign-out successful.
  }).catch((error) => {
      // An error happened.
console.log(error);
  });
}




let del=document.getElementsByClassName('delete')
del.addEventListener("click",function(){
  console.log("A");
})