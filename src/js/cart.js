import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", removeItemFromCart);
  });
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    
    <!-- 🔹 Botão para remover item -->
    <button 
      class="remove-item" 
      data-id="${item.Id}" 
      aria-label="Remove item from cart"
      style="
        background: none;
        border: none;
        color: #ff4444;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 10px;
      ">
      ✖
    </button>
  </li>
  `;
  return newItem;
}

function removeItemFromCart(event) {
  const idToRemove = event.target.dataset.id;
  if (!idToRemove) return;

  let cartItems = getLocalStorage("so-cart") || [];

  const updatedCart = cartItems.filter(item => item.Id != idToRemove);

  localStorage.setItem("so-cart", JSON.stringify(updatedCart));

  renderCartContents();
}

renderCartContents();
