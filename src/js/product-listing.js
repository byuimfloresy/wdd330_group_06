import ExternalServices from "./ExternalServices.mjs"
import ProductList from "./ProductList.mjs"
import { getParam } from "./utils.mjs"

function initialize() {
  const category = getParam("category");
  const listElement = document.querySelector(".product-list");
  const dataSource = new ProductData(category);
  
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
}

function renderTitle(category) {
  const productCategoryTitle = document.getElementById("top-products-category");
  if (category) {
      const firstCharacterUpper = category[0].toUpperCase();
      const caseCategory = `${firstCharacterUpper}${category.substring(1).toLowerCase()}`;
      productCategoryTitle.innerText = `Top Products: ${caseCategory}`;
  }
}

initialize()