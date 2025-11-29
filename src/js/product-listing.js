import ExternalServices from "./ExternalServices.mjs"
import ProductList from "./ProductList.mjs"
import { getParam } from "./utils.mjs"

function initialize() {
  const category = getParam("category");
  const listElement = document.querySelector(".product-list");
  const dataSource = new ExternalServices(category);
  
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
  
  renderTitle(category);

  const sortSelect = document.querySelector("#sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const sortValue = e.target.value;
      
      productList.sortList(sortValue);
    });
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
}

function renderTitle(category) {
  const productCategoryTitle = document.getElementById("top-products-category");
  if (category) {
      const firstCharacterUpper = category[0].toUpperCase();
      const caseCategory = `${firstCharacterUpper}${category.substring(1).toLowerCase()}`;
      productCategoryTitle.innerText = `Top Products: ${caseCategory}`;
  }
}

function handleSearch() {
  const query = document.querySelector("#searchInput").value;
  const category = getParam("category");
  if (query) {
    window.location.href = `/product_listing/index.html?category=${category}&q=${encodeURIComponent(query)}`;
  }
}

initialize()