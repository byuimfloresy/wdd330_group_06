import { getLocalStorage } from "./utils.mjs";

// Render cart items in the DOM
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add remove event listeners to all buttons
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", removeItemFromCart);
  });

  // Update total price
  updateCartTotal(cartItems);
}

// Template for a single cart item
function cartItemTemplate(item) {
  return `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    
    <button 
      class="remove-item" 
      data-id="${item.Id}" 
      aria-label="Remove item from cart"
      style="background:none; border:none; color:#ff4444; font-size:1.2rem; cursor:pointer; margin-left:10px;">
      ✖
    </button>
  </li>`;
}

// Remove an item from localStorage and re-render
function removeItemFromCart(event) {
  const idToRemove = event.target.dataset.id;
  if (!idToRemove) return;

  let cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.filter(item => item.Id != idToRemove);

  localStorage.setItem("so-cart", JSON.stringify(updatedCart));
  renderCartContents();
}

// Update cart total in the footer
function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalEl = document.querySelector(".cart-total");

  if (!cartItems.length) {
    cartFooter.classList.add("hide");
    // Also reset total to $0.00
    cartTotalEl.textContent = `Total: $0.00`;
    return;
  }

  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");
}

// Initial render
renderCartContents();
