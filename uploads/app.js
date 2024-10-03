import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyCNEplx2T0vwmSOSuInj9SvXZzUESAuLNg",
  authDomain: "hidden-analyzer-425514-u8.firebaseapp.com",
  projectId: "hidden-analyzer-425514-u8",
  storageBucket: "hidden-analyzer-425514-u8.appspot.com",
  messagingSenderId: "838420877540",
  appId: "1:838420877540:web:e174c09ffd903442dd9cf1",
  measurementId: "G-Q0N1HKJ4WC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
console.log(storage);
const submit_food_form = document.getElementById("submit_food_form");



submit_food_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const image = e.target[0].files[0]
    const imageRef = ref(storage, 'images/jpg');
    uploadBytes(imageRef, image).then(() => {
        console.log("Image upload hogye")
    
        getDownloadURL(imageRef).then((url) => {
            console.log("url agye=>", url)})
    })
        .catch((err) => console.log(err));

    
   })