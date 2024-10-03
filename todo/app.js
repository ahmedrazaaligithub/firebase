   // ---------------------------------------import items------------------------------------------------------------
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
   import { getAuth, 
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
    onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    import {  getDatabase,
      ref,
      push,
      onValue,
      child,
      set,
      query,
      equalTo,
      get,
      orderByChild,
      update,
      remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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
 let todo_container= document.getElementById("todo_container")
   let email=document.getElementById("email")
   let password=document.getElementById("password")
   let userName = document.getElementById("userName")
   let email_log=document.getElementById("email_log")
  let password_log=document.getElementById("password_log")
   let login_btn=document.getElementById("login_btn")
   let logout_btn=document.getElementById("logout_btn")
   let addTodo = document.getElementById("addTodo")
   let todoItems = document.getElementById("todoItems")
   let linkReg = document.getElementById("linkReg")
   let todoValue = document.getElementById("todoValue")
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
      apiKey: "AIzaSyCSyjfJhiEdCMr9uvWbKEnaS_fNczTJMoY",
      authDomain: "todo-f6e7f.firebaseapp.com",
      projectId: "todo-f6e7f",
      storageBucket: "todo-f6e7f.appspot.com",
      messagingSenderId: "1017384307328",
      appId: "1:1017384307328:web:f083704941e38d48e77465"
    };
       // ---------------------------------------constants------------------------------------------------------------
    const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  console.log(app);
  const database = getDatabase(app);
  const db= getDatabase();
     // ---------------------------------------event listeneres------------------------------------------------------------
  register_btn.addEventListener("click",registeruser)
  login_btn.addEventListener("click",loginUser)
  addTodo.addEventListener("click",submitTodoFunc)
  selectLogin.addEventListener("click",function() {
    regme("login");
    logout_btn.addEventListener("click",logout)
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
      todo_container.style.display="none"

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
      todo_container.style.display="block"
select.style.display="none"
      const uid = user.uid;
      console.log(uid);
      getTodos()
    } else {
      todo_container.style.display="none"
      select.style.display="block"
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
        console.log(errorMessage);
        danger.style.display="block"
    danger.innerHTML=`${errorMessage} <i class='fa-solid fa-xmark text-danger'></i>`;
      });
  }
  function loginUser(){
    signInWithEmailAndPassword(auth, email_log.value, password_log.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
     console.log(user);
     login_div.style.display="none"
  // logout_container.style.display="block";
  // register_div.style.display="none";
  // danger.style.display="none"
  
;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      success.style.display="none"
      danger.style.display="block"
  danger.innerHTML= `incorrect email or password <i class='fa-solid fa-xmark text-danger'></i>`
  
    });
    
  }
  function logout () {
    signOut(auth)
      .then(() => {
console.log('signout');
})
      .catch(error => {
        console.log('not signout');
      })
  }
  function submitTodoFunc(){
    const todo = todoValue.value
    if (!todo) return alert('Please add some todo')
    const todoListRef = ref(db, `todos/${auth.currentUser.uid}`)
    const newTodoRef = push(todoListRef)

    const obj = {
      todo,
      status: 'pending'
    }
    set(newTodoRef, obj)
  
  }
  function getTodos () {
    const todoListRef = ref(db, `todos/${auth.currentUser.uid}`)
  onValue(todoListRef, snapshot => {
    const isDataExist = snapshot.exists()
    if (isDataExist) {
      todoItems.innerHTML = null
      snapshot.forEach(childSnapshot => {
        const childKey = childSnapshot.key
        const childData = childSnapshot.val()
        console.log('childKey=>', childKey)
        console.log('childData=>', childData)
        const listItem = `
        
        <li id = ${childKey}> ${
          childData.todo
        } <button id =${childKey +
          '-edit'}>Edit</button> <button id =${childKey +
          '-del'}>Delete</button> </li>`
          todoItems.innerHTML += listItem
        setTimeout(() => {
          const editbtn = document.getElementById(childKey + '-edit')
          editbtn.addEventListener('click', editFunc)
          const deleteBtn = document.getElementById(childKey + '-del')
          deleteBtn.addEventListener('click', deleteFunc)
        }, 1000)
      })
    }
  })
  }
  function editFunc () {
    const elementId = this.id.slice(0, this.id.length - 5)
    const todoRef = ref(db, `todos/${auth.currentUser.uid}/${elementId}`)
    let newTodo = prompt('Edit your todo', this.parentNode.firstChild)
    update(todoRef, { status: newTodo })
  }
  
  function deleteFunc () {
    const elementId = this.id.slice(0, this.id.length - 4)
    console.log(this.id.slice(0, this.id.length - 4))
    const todoRef = ref(db, `todos/${auth.currentUser.uid}/${elementId}`)
    remove(todoRef)
  }