/***********************
 * عناصر DOM
 ***********************/
const cartContainer = document.querySelector(".cart-section");
const favContainer  = document.querySelector(".fav-section");
const cartCountEl   = document.querySelector(".cart-count"); // لو فيه هيدر مشترك

const totalPriceEl        = document.getElementById("total-price");

/***********************
 * حالة التخزين
 ***********************/
let cartItems = (JSON.parse(localStorage.getItem("ProductsInCart") || "[]") || []).filter(Boolean);
let favorites = (JSON.parse(localStorage.getItem("Favorites")      || "[]") || []).filter(Boolean);

/***********************
 * أدوات مساعدة
 ***********************/
function saveCart()      { localStorage.setItem("ProductsInCart", JSON.stringify(cartItems)); }
function saveFavorites() { localStorage.setItem("Favorites",      JSON.stringify(favorites)); }

function updateCartCount(){
  if(!cartCountEl) return;
  const totalQty = cartItems.reduce((sum, item)=> sum + (item.qty || 1), 0);
  cartCountEl.textContent = totalQty;
  cartCountEl.style.display = totalQty > 0 ? "block" : "none";
}

/***********************
 * رسم سكشن الكارت
 ***********************/
function renderCartSection(){
  if(!cartContainer) return;
  cartContainer.innerHTML = "";

  if(cartItems.length === 0){
    cartContainer.innerHTML = `<p class="empty">No items in cart.</p>`;
    updateCartCount();
    return;
  }

  cartItems.forEach(item=>{
    const card = document.createElement("div");
    card.className = "card-product";
    card.dataset.id = item.id;

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="card-img">
      <div class="title-card">
        <div class="name-product">${item.name}</div>
        <div class="price">Price: ${item.price}$</div>
          <button class="btn-remove-cart">Remove</button>
      </div>
    `;
    cartContainer.appendChild(card);
  });

  updateCartCount();
    const total = cartItems.reduce((s, it)=> s + it.price * (it.qty || 1), 0);
  if(totalPriceEl) totalPriceEl.textContent = `${total}$`;
}

/***********************
 * رسم سكشن المفضلة
 ***********************/
function renderFavSection(){
  if(!favContainer) return;
  favContainer.innerHTML = "";

  if(favorites.length === 0){
    favContainer.innerHTML = `<p class="empty">No favorites yet.</p>`;
    return;
  }

  favorites.forEach(item=>{
    const card = document.createElement("div");
    card.className = "card-product";
    card.dataset.id = item.id;

    card.innerHTML = `
      <img src="${item.image}" alt="${item.img}" class="card-img">
      <div class="title-card">
        <div class="name-product">${item.name}</div>
        <div class="price">Price: ${item.price}$</div>
        <div class="cart_fav_action">
          <button class="btn-fav fav-active">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    `;
    favContainer.appendChild(card);
  });
}

/***********************
 * أحداث السكشنين
 ***********************/
// إزالة من الكارت
if(cartContainer){
  cartContainer.addEventListener("click", (e)=>{
    if(e.target.classList.contains("btn-remove-cart")){
      const card = e.target.closest(".card-product");
      if(!card) return;
      const id = parseInt(card.dataset.id, 10);
      cartItems = cartItems.filter(ci => ci.id !== id);
      saveCart();
      renderCartSection();
    }
  });
}

// إزالة من المفضلة
if(favContainer){
  favContainer.addEventListener("click", (e)=>{
    if(e.target.closest(".btn-fav")){
      const card = e.target.closest(".card-product");
      if(!card) return;
      const id = parseInt(card.dataset.id, 10);
      favorites = favorites.filter(fav => fav.id !== id);
      saveFavorites();
      renderFavSection();
    }
  });
}

/***********************
 * تشغيل أولي
 ***********************/
renderCartSection();
renderFavSection();
updateCartCount();
