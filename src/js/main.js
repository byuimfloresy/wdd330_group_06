import { updateCartCount } from "./utils.mjs";

updateCartCount();

function handleSearch() {
  const query = document.querySelector("#searchInput").value;
  if (query) {
    window.location.href = `/product_listing/index.html?category=tents&q=${encodeURIComponent(query)}`;
  }
}

const searchBtn = document.querySelector("#searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  const searchInput = document.querySelector("#searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }