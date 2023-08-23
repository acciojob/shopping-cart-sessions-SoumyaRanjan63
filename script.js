// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  
  for (let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i);
    let product = JSON.parse(sessionStorage.getItem(key));

    const li = document.createElement('li');
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${key}">Remove</button>`;
    cartList.appendChild(li);
  }
}

// Add item to cart
function addToCart(productId) {
  const productToAdd = products.find(product => product.id == productId);
  if (productToAdd) {
    sessionStorage.setItem(productId, JSON.stringify(productToAdd));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  sessionStorage.removeItem(productId);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.clear();
  renderCart();
}

// Add event listener to product list
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = event.target.getAttribute("data-id");
    addToCart(productId);
  }
});

// Add event listener to cart list
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = event.target.getAttribute("data-id");
    removeFromCart(productId);
  }
});

// Initial render
renderProducts();
renderCart();
