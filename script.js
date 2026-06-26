
// AxtarTap Script.js

let currentUser = "";

window.onload = function(){

loadAds();

let user =
localStorage.getItem("logged_user");

if(user){

currentUser=user;

let status =
document.getElementById("status");

if(status){

status.innerHTML=
"✅ Daxil olub: "+user;

}

}

};

function registerUser(){

let username=
document.getElementById("username").value.trim();

let password=
document.getElementById("password").value.trim();

if(username=="" || password==""){

alert("İstifadəçi adı və parol daxil edin");
return;

}

localStorage.setItem(
"axtartap_username",
username
);

localStorage.setItem(
"axtartap_password",
password
);

alert("Qeydiyyat tamamlandı");

}

function loginUser(){

let username=
document.getElementById("username").value.trim();

let password=
document.getElementById("password").value.trim();

let savedUser=
localStorage.getItem("axtartap_username");

let savedPass=
localStorage.getItem("axtartap_password");

if(username==savedUser &&
password==savedPass){

localStorage.setItem(
"logged_user",
username
);

currentUser=username;

document.getElementById("status").innerHTML=
"✅ Daxil olub: "+username;

}else{

alert("İstifadəçi adı və ya parol səhvdir");

}

}

function logoutUser(){

localStorage.removeItem("logged_user");

currentUser="";

document.getElementById("status").innerHTML=
"❌ Çıxış edildi";

}
function saveAds(){

let ads=[];

document
.querySelectorAll("#allAds .ad")
.forEach(item=>{

ads.push({

title:item.dataset.title,
price:item.dataset.price,
image:item.dataset.image,
category:item.dataset.category,
phone:item.dataset.phone,
description:item.dataset.description,
owner:item.dataset.owner,
date:item.dataset.date

});

});

localStorage.setItem(
"axtartap_ads",
JSON.stringify(ads)
);

}

function loadAds(){

let data=
localStorage.getItem("axtartap_ads");

if(!data) return;

document.getElementById("allAds").innerHTML="";

JSON.parse(data).forEach(ad=>{

createAd(ad);

});

}

function addAd(){

if(currentUser==""){

alert("Əvvəlcə daxil olun");
return;

}

let ad={

title:document.getElementById("title").value,
price:document.getElementById("price").value,
image:document.getElementById("image").value,
category:document.getElementById("category").value,
phone:document.getElementById("phone").value,
description:document.getElementById("description").value,
owner:currentUser,
date:new Date().toLocaleString()

};

createAd(ad);

saveAds();

showMyAds();

}

function createAd(ad){

let div=document.createElement("div");

div.className="ad";

div.dataset.title=ad.title;
div.dataset.price=ad.price;
div.dataset.image=ad.image;
div.dataset.category=ad.category;
div.dataset.phone=ad.phone;
div.dataset.description=ad.description;
div.dataset.owner=ad.owner;
div.dataset.date=ad.date;

div.innerHTML=`

<img src="${ad.image||'https://picsum.photos/500/300'}">

<div class="ad-info">

<h3>${ad.title}</h3>

<div class="price">
${ad.price} AZN
</div>

<p><b>Kateqoriya:</b> ${ad.category}</p>

<p><b>Telefon:</b> ${ad.phone}</p>

<p>${ad.description}</p>

<p>${ad.date}</p>

<p class="owner">
👤 ${ad.owner}
</p>

<div class="action-buttons">

<button onclick="favoriteAd(this)">
❤️ Favori
</button>

<button onclick="deleteAd(this)">
🗑 Sil
</button>

</div>

</div>

`;

document
.getElementById("allAds")
.prepend(div);

}
function deleteAd(btn){

let ad=btn.closest(".ad");

if(ad.dataset.owner!=currentUser){

alert("Yalnız öz elanınızı silə bilərsiniz.");
return;

}

if(confirm("Elan silinsin?")){

ad.remove();

saveAds();

showMyAds();

}

}

function favoriteAd(btn){

if(btn.innerHTML=="❤️ Favori"){

btn.innerHTML="💖 Seçilmiş";

}else{

btn.innerHTML="❤️ Favori";

}

}

function searchAds(){

let text=document
.getElementById("searchInput")
.value
.toLowerCase();

document
.querySelectorAll("#allAds .ad")
.forEach(ad=>{

if(ad.innerText.toLowerCase().includes(text)){

ad.style.display="block";

}else{

ad.style.display="none";

}

});

}

function showMyAds(){

let box=document.getElementById("myAds");

if(!box) return;

box.innerHTML="";

document
.querySelectorAll("#allAds .ad")
.forEach(ad=>{

if(ad.dataset.owner==currentUser){

let copy=ad.cloneNode(true);

box.appendChild(copy);

}

});

}

document.addEventListener("input",function(e){

if(e.target.id=="searchInput"){

searchAds();

}

});
