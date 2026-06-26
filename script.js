let currentUser = null;

window.onload = async function () {

    checkLogin();

    await loadAds();

};

function checkLogin() {

    const user = localStorage.getItem("logged_user");

    if (user) {

        currentUser = user;

        document.getElementById("status").innerHTML =
            "✅ Daxil olub: " + user;

    }

}

async function registerUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!username || !password) {

        alert("İstifadəçi adı və parol daxil edin");

        return;

    }

    const { error } = await supabase
        .from("users")
        .insert([
            {
                username,
                password
            }
        ]);

    if (error) {

        alert(error.message);

        return;

    }

    alert("Qeydiyyat uğurlu oldu");

}

async function loginUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password);

    if (error) {

        alert(error.message);

        return;

    }

    if (data.length == 0) {

        alert("İstifadəçi adı və ya parol yanlışdır");

        return;

    }

    localStorage.setItem(
        "logged_user",
        username
    );

    currentUser = username;

    document.getElementById("status").innerHTML =
        "✅ Daxil olub: " + username;

    showMyAds();

}

function logoutUser() {

    localStorage.removeItem("logged_user");

    currentUser = null;

    document.getElementById("status").innerHTML =
        "❌ Hesabdan çıxıldı";

    showMyAds();


}
async function addAd() {

    if (!currentUser) {

        alert("Əvvəlcə hesabınıza daxil olun.");

        return;

    }

    const title =
        document.getElementById("title").value.trim();

    const price =
        document.getElementById("price").value.trim();

    const image =
        document.getElementById("image").value.trim();

    const category =
        document.getElementById("category").value;

    const phone =
        document.getElementById("phone").value.trim();

    const description =
        document.getElementById("description").value.trim();

    if (title == "" || price == "") {

        alert("Başlıq və qiymət daxil edin.");

        return;

    }

    const { error } = await supabase
        .from("ads")
        .insert([
            {
                title,
                price,
                image,
                category,
                phone,
                description,
                owner: currentUser
            }
        ]);

    if (error) {

        alert(error.message);

        return;

    }

    alert("Elan uğurla əlavə edildi.");

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("description").value = "";

    loadAds();

}

async function loadAds() {

    const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("id", { ascending: false });

    if (error) {

        console.log(error);

        return;

    }

    const ads =
        document.getElementById("allAds");

    ads.innerHTML = "";

    data.forEach(ad => {

        createCard(ad);

    });

    showMyAds();

}

function createCard(ad) {

    const div =
        document.createElement("div");

    div.className = "ad";

    div.dataset.owner = ad.owner;
    div.dataset.id = ad.id;

    div.innerHTML = `

<img src="${ad.image || "https://picsum.photos/500/300"}">

<div class="ad-info">

<h3>${ad.title}</h3>

<div class="price">${ad.price} AZN</div>

<p><b>Kateqoriya:</b> ${ad.category}</p>

<p><b>Telefon:</b> ${ad.phone}</p>

<p>${ad.description}</p>

<p class="owner">👤 ${ad.owner}</p>

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
        .appendChild(div);

}
function deleteAd(btn){

    let card = btn.closest(".ad");

    let owner = card.dataset.owner;

    if(owner != currentUser){

        alert("Yalnız öz elanınızı silə bilərsiniz.");

        return;

    }

    if(confirm("Elan silinsin?")){

        deleteAdFromDatabase(card.dataset.id);

    }

}

async function deleteAdFromDatabase(id){

    const { error } = await supabase
        .from("ads")
        .delete()
        .eq("id", id);

    if(error){

        alert(error.message);

        return;

    }

    loadAds();

}

function favoriteAd(btn){

    if(btn.innerHTML=="❤️ Favori"){

        btn.innerHTML="💖 Seçilmiş";

    }else{

        btn.innerHTML="❤️ Favori";

    }

}

function searchAds(){

    let text =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    document
    .querySelectorAll(".ad")
    .forEach(ad=>{

        if(ad.innerText.toLowerCase().includes(text)){

            ad.style.display="block";

        }else{

            ad.style.display="none";

        }

    });

}

function showMyAds(){

    const box =
    document.getElementById("myAds");

    if(!box) return;

    box.innerHTML="";

    document
    .querySelectorAll("#allAds .ad")
    .forEach(ad=>{

        if(ad.dataset.owner==currentUser){

            let copy =
            ad.cloneNode(true);

            box.appendChild(copy);

        }

    });

}

document
.getElementById("searchInput")
.addEventListener("keyup",searchAds);
