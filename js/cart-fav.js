/***********************
 * عناصر DOM
 ***********************/
const cartContainer = document.querySelector(".cart-section");
const favContainer  = document.querySelector(".fav-section");
const cartCountEl   = document.querySelector(".cart-count"); 
const totalPriceEl  = document.getElementById("total-price");

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
    if(totalPriceEl) totalPriceEl.textContent = "0$";
    updateCartCount();
    return;
  }

  cartItems.forEach(item=>{
    const card = document.createElement("div");
    card.className = "card-product";
    card.dataset.id = item.id;

    card.innerHTML = `
          <img src="${item.image}" alt="${item.img}" class="card-img">
      <div class="name-product">${item.name}</div>
      <div class="price">${item.price}$</div>
      <div class="cart-quantity">
        <button class="minus">-</button>
        <span class="quantity">${item.qty || 1}</span>
        <button class="plus">+</button>
      </div>
      <div class="cart-total">${item.price * (item.qty || 1)}$</div>
      <button class="btn-remove-cart">Remove</button>
    `;
    cartContainer.appendChild(card);
  });

  const total = cartItems.reduce((s, it)=> s + it.price * (it.qty || 1), 0);
  if(totalPriceEl) totalPriceEl.textContent = `${total}$`;
  updateCartCount();
}

/***********************
 * أحداث الكارت
 ***********************/
if(cartContainer){
  cartContainer.addEventListener("click", e=>{
    const card = e.target.closest(".card-product");
    if(!card) return;
    const id = parseInt(card.dataset.id);
    let item = cartItems.find(ci => ci.id === id);
    if(!item) return;

    if(e.target.classList.contains("plus")){
      item.qty = (item.qty || 1) + 1;
    }
    if(e.target.classList.contains("minus")){
      item.qty = (item.qty || 1) - 1;
      if(item.qty <= 0){
        cartItems = cartItems.filter(ci => ci.id !== id);
      }
    }
    if(e.target.classList.contains("btn-remove-cart")){
      cartItems = cartItems.filter(ci => ci.id !== id);
    }

    saveCart();
    renderCartSection();  // تحديث الكارت كله بعد أي تعديل
  });
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
 * أحداث المفضلة
 ***********************/
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
