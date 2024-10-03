import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged,signInWithEmailAndPassword,signOut  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore,collection, addDoc  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhRaVflOyOk2jtPxnOb782EP_i42cN5Ho",
  authDomain: "chat-app-f27c6.firebaseapp.com",
  projectId: "chat-app-f27c6",
  storageBucket: "chat-app-f27c6.appspot.com",
  messagingSenderId: "1052399856386",
  appId: "1:1052399856386:web:efb6fc2d674290887df01b",
  measurementId: "G-S9SC4Z99P9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);
const db = getFirestore(app);
const userCollection = collection(db,'users')


// variable declearation
const authContainer = document.getElementById("authContainer")
const content = document.getElementById("content")
const signUpEmail = document.getElementById("signUpEmail")
const signUpPassword = document.getElementById("signUpPassword")
const signUpBtn = document.getElementById("signUpBtn")
const signInEmail = document.getElementById("signInEmail")
const signInPassword = document.getElementById("signInPassword")
const signInBtn = document.getElementById("signInBtn")
const logoutBtn = document.getElementById("logout")



onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    authContainer.style.display="none"
    content.style.display="block"
    console.log("user",user);
  } else {
    content.style.display="none"
    authContainer.style.display="block"
console.log("no user");
  }
});
signUpBtn.addEventListener("click",createUser)
signInBtn.addEventListener("click",signin)
logoutBtn.addEventListener("click",logout)
async function createUser() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value);
    const user = userCredential.user;
    const docRef = await addDoc(userCollection, {
      email: user.email,
      user_id: user.uid,
      created_at: new Date().toISOString()
    });

    console.log(docRef);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorMessage', errorMessage);
  }
}
function signin(){
  console.log(signInEmail.value);
  console.log(signInPassword.value);
  signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user signin");
    const querySnapshot = getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("signin error",errorMessage);
    
  });
  
}

function logout(){
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
  
