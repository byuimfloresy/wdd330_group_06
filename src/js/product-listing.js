import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs"
import { getParam } from "./utils.mjs";

function initialize(){
    const category =  getParam("category");
    const listElement = document.querySelector(".product-list")
    const dataSource = new ProductData(category)
    const productList = new ProductList(category, dataSource, listElement)
    productList.init()
    renderTitle()
}

function renderTitle(){
  const productCategoryTitle = document.getElementById("top-products-category")
  const firstCharacterUpper = category[0].toUpperCase()
  const caseCategory = `${firstCharacterUpper}${category.substring(1, category.length).toLocaleLowerCase()}`
  productCategoryTitle.innerText = `Top Products: ${caseCategory}`
}

initialize()
