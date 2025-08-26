
/***********************
 * تأمين قائمة المنتجات
 ***********************/

window.productsList = window.productsList || [
  //  Indoor Plants
  {
    id: 1,
    name: "Snake Plant",
    price: 25,
    category: "Indoor",
    image: "img/1-1.jpg"
  },
  {
    id: 2,
    name: "Monstera Deliciosa",
    price: 40,
    category: "Indoor",
    image: "img/cute.jpg"
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 30,
    category: "Indoor",
    image: "img/1-3.jpg"
  },
  {
    id: 4,
    name: "Areca Palm",
    price: 35,
    category: "Indoor",
    image: "img/1-4.jpg"
  },

 
  {
    id: 5,
    name: "Aloe Vera",
    price: 20,
    category: "Indoor",
    image: "img/1-10.jpg"
  },
  {
    id: 6,
    name: "Echeveria",
    price: 15,
    category: "Succulent",
    image: "img/Indoor Plants5.jpg"
  },
  {
    id: 7,
    name: "Cactus Mix",
    price: 22,
    category: "Succulent",
    image: "img/Indoor Plants7.jpg"
  },
  {
    id: 8,
    name: "Jade Plant",
    price: 28,
    category: "Succulent",
    image: "img/Indoor Plants8.jpg"
  },

  // 🪴 Outdoor
  {
    id: 9,
    name: "Ceramic Pot",
    price: 12,
    category: "Indoor",
    image: "img/1-9.jpg"
  },
  {
    id: 10,
    name: "Terracotta Pot",
    price: 10,
    category: "Indoor",
    image: "img/1-6.jpg"
  },
  {
    id: 11,
    name: "Gardening Tools Set",
    price: 18,
    category: "Outdoor",
    image: "img/Indoor Plants4.jpg"
  },
  {
    id: 12,
    name: "Watering Can",
    price: 14,
    category: "Outdoor",
    image: "img/1-11.jpg"
  }
];

/***********************
 * عناصر DOM
 ***********************/
const productsContainer   = document.querySelector(".products");
const cartCountEl         = document.querySelector(".cart-count");
const shoppingCartIcon    = document.querySelector(".shopping_cart");
const cartDropdown        = document.querySelector(".cart-items");
const cartListEl          = document.querySelector(".cart-items-list");
const totalPriceEl        = document.getElementById("total-price");

/***********************
 * حالة التخزين
 ***********************/
let cartItems  = (JSON.parse(localStorage.getItem("ProductsInCart") || "[]") || []).filter(Boolean);
let favorites  = (JSON.parse(localStorage.getItem("Favorites")      || "[]") || []).filter(Boolean);

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

function renderMiniCart(){
  if(!cartListEl) return;
  cartListEl.innerHTML = "";
  if(cartItems.length === 0){
    cartListEl.innerHTML = `<p class="empty"">No items</p>`;
    if(totalPriceEl) totalPriceEl.textContent = "0$";
    return;
  }

  cartItems.forEach(item=>{
    const row = document.createElement("div");
    row.className = "cart-item";
    row.dataset.id = item.id;
    row.innerHTML = `
      <span class="name">${item.name}</span>
      <span class="price">${(item.price * (item.qty || 1))}$</span>
      <div class="quantity-control">
        <button class="minus">-</button>
        <span class="quantity">${item.qty || 1}</span>
        <button class="plus">+</button>
      </div>
    `;
    cartListEl.appendChild(row);
    
  });

  const total = cartItems.reduce((s, it)=> s + it.price * (it.qty || 1), 0);
  if(totalPriceEl) totalPriceEl.textContent = `${total}$`;


}

/***********************
 * رسم كروت المنتجات
 ***********************/
function renderProducts(list, containerId){
  const container = document.getElementById(containerId);
  if(!container) return;

  container.innerHTML = "";
  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "card-product";
    card.dataset.id = item.id;

    const inCart = cartItems.find(p => p.id === item.id);
    const inFav = favorites.find(p => p.id === item.id);

    card.innerHTML = `
      <img src="${item.image}" alt="${item.img}" class="card-img">
      <div class="title-card">
        <div class="name-product">${item.name}</div>
        <div class="price">Price: ${item.price}$</div>
        <div class="sec-product">Category: ${item.category}</div>
        <div class="cart_fav_action">
          <button class="btn-add-cart">${inCart ? "Remove" : "Add to Cart"}</button>
          <button class="btn-fav ${inFav ? "fav-active" : ""}">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  })};

// //////////////////////////////////////داله تقسيم الكروت لقسمين//////////////////////////////
const featured = productsList.slice(0, 6);
const newArrivals = productsList.slice(6,12);

renderProducts(featured, "featured-products");
renderProducts(newArrivals, "new-products");

/***********************
 * تفاعل كروت المنتجات
 ***********************/

function updateButtonsState(){
  [ "featured-products",  "new-products" ].forEach(containerId => {
    const container = document.getElementById(containerId);
    if(!container) return;
  
    const cards = container.querySelectorAll(".card-product");
    cards.forEach(card => {
      
      const id = parseInt(card.dataset.id);

      // زر السلة
      const btnCart = card.querySelector(".btn-add-cart");
      if(btnCart){
        if(cartItems.find(p => p.id === id)){
          btnCart.innerText = "Remove";
                    btnCart.style.backgroundColor = "#f44336"; // أحمر
        } else {
          btnCart.innerText = "Add to Cart";
                    btnCart.style.backgroundColor = "#4CAF50"; // أخضر
        }
      }

      // زر المفضلة
      const btnFav = card.querySelector(".btn-fav");
      if(btnFav){
        if(favorites.find(p => p.id === id)){
          btnFav.classList.add("fav-active");
        } else {
          btnFav.classList.remove("fav-active");
        }
      }
    });
  });
}

/***********************
 * تفاعل الميني-كارت ( + / - )
 ***********************/
if(cartListEl){
  cartListEl.addEventListener("click", (a)=>{
    a.stopPropagation();
    const row = a.target.closest(".cart-item");
    if(!row) return;
    const id = parseInt(row.dataset.id, 10);
    const item = cartItems.find(ci => ci.id === id);
    if(!item) return;


    if(a.target.classList.contains("plus")){
      item.qty = (item.qty || 1) + 1;
    }
    if(a.target.classList.contains("minus")){
      item.qty = (item.qty || 1) - 1;
      if(item.qty <= 0){
        cartItems = cartItems.filter(ci => ci.id !== id);
      }
    }
    saveCart();
    updateCartCount();
    renderMiniCart();
     
  });
}

/***********************
 * فتح/غلق الميني-كارت
 ***********************/
if(shoppingCartIcon && cartDropdown){
  shoppingCartIcon.addEventListener("click", (a)=>{
    a.stopPropagation();
    cartDropdown.style.display = (cartDropdown.style.display === "block") ? "none" : "block";
  });
}

/***********************
 * تشغيل أولي
 ***********************/
// ==================== أحداث الأزرار ====================
document.addEventListener("click", e => {
  const card = e.target.closest(".card-product");
  if(!card) return;
  const id = parseInt(card.dataset.id);
  const product = productsList.find(p => p.id === id);

  // Add / Remove Cart
// Add / Remove Cart
if(e.target.classList.contains("btn-add-cart")){
    // ✅ هنا تحطي الشرط
    if(!localStorage.getItem("FirstName")){
        // مفيش يوزر → يروح لصفحة login
        window.location.href = "login.html";
        return; // نوقف العملية
    }

    let exist = cartItems.find(p => p.id === id);
    if(exist){
        cartItems = cartItems.filter(p => p.id !== id);
    } else {
        let product = productsList.find(p => p.id === id);
        if(product){
            product.qty = 1;
            cartItems.push(product);
        }
    }
    


    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
 
updateButtonsState();   // يغير شكل الأزرار (Add/Remove)
updateCartCount();  
renderMiniCart();      // يعدّل عدد المنتجات فوق الأيقونة

  }

  // Favorite
  if(e.target.closest(".btn-fav")){
     if(!localStorage.getItem("FirstName")){
        // مفيش يوزر → يروح لصفحة login
        window.location.href = "login.html";
        return; // نوقف العملية
    }
    const existFav = favorites.find(p => p.id === id);
    if(existFav){
      favorites = favorites.filter(p => p.id !== id);
    } else {
      favorites.push(product);
    }
    localStorage.setItem("Favorites", JSON.stringify(favorites));
    updateButtonsState();
    
  }
});

////////////////////////////////////////////////////////////////////

// ==================== البحث ====================
if(searchInput){
  searchInput.addEventListener("input", function(){
    let keyword = this.value.toLowerCase();

    let filtered = productsList.filter(item => 
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
    );

   

    renderProducts(filtered, "featured-products"); 
    renderProducts(filtered, "new-products"); 
    updateButtonsState();
  });
}


// ==================== الفلاتر (الأقسام) ====================
const categoryFilter = document.getElementById("categoryFilter");
if(categoryFilter){
  categoryFilter.addEventListener("change", e => {
    const selected = e.target.value;
    const filtered = selected === "all" ? productsList : productsList.filter(p => p.category === selected);
 renderProducts(filtered, "featured-products"); 
    renderProducts(filtered, "new-products"); 
        updateButtonsState();
  });
}
// ==================== بدء ====================
updateButtonsState();
updateCartCount();
renderMiniCart();


