//------------------------------------------import--------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth   } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
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


//----------------------------------------ids-------------------------------------------------------------------
let showUserName = document.getElementById("showUserName")
let showCards = document.getElementById("showCards")
let category =document.getElementById("category")





//------------------------------------------------events----------------------------------------------------






//----------------------------------------------functions------------------------------------------------------------
setTimeout(() => {
let uid= auth.currentUser.uid
    const starCountRef = ref(db, 'user/' +uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let uname=data.username
      showUserName.innerHTML=uname
      updateStarCount(postElement, data);
    });
    
}, 2000);
getPoducts()
async function getPoducts(){
 const api =await fetch('https://dummyjson.com/products')
    .then(res => res.json())
let products=api.products
// console.log(products);
let cetogery =[]//
products.map(e => {
if (!cetogery.includes(e.category)) {
cetogery.push(e.category);
return cetogery
}
});
// console.log(cetogery);
// =========filter
category.addEventListener("click",function(filterItem){
  if (filterItem.target.classList.contains('btn')) {
    filterProducts(filterItem.target);
    // console.log(event.target);
  }
})
function filterProducts (e){
  showCards.innerHTML = ""
  let currentValue=e.innerHTML
  products.filter((val)=>{
 if(val.category==currentValue){
  // console.log(val);
  const {thumbnail, title, price,description}=val
  const card = `<div class='col col-3  border'>

  <img src =${thumbnail} class="img-fluid" />
    <h4>${title} </h4>
    <p>${description} </p>
    <h4>$${price} </h4>
    <button class="btn btn-outline-success my-1" >add to cart</button>
  

       </div>`
      showCards.innerHTML += card
 }
 else{


 }
  })
}

category.innerHTML+=`<div class="mx-2"><button class="btn btn-success">all</button></div>`
cetogery.map(e=>{
  category.innerHTML+=`<div class="mx-2 mb-0"><button class="btn btn-success" >${e}</button></div>`
})
const showCards = document.getElementById('showCards');
//======addtocart
showCards.addEventListener('click', function(event) {
  if (event.target.classList.contains('btn')) {
    addToCart(event.target);
    // console.log(event.target);
  }

});
// let cardValueas=[]
function addToCart (event){
let parent=event.parentNode
console.log(parent);
}
showAllProducts()
function showAllProducts(){
products.map((e,i)=>{
    const {thumbnail, title, price,description}=e
    const card = `<div class='col col-3  border'>

    <img src =${thumbnail} class="img-fluid" />
      <h4>${title} </h4>
      <p>${description} </p>
      <h4>$${price} </h4>
      <button class="btn btn-outline-success my-1" >add to cart</button>
    

         </div>`
        showCards.innerHTML += card

})}
// products.forEach((data, i) => {
//     //desctructuring
//     const { thumbnail, title, price } = data
//     const card = `<div class='card' >
//     <img src =${thumbnail} />
//     <h4>${title} </h4>
//     <h4>${price} </h4>
//     </div>`
//     showCards.innerHTML += card
// })




}













