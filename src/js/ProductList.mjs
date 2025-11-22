import { renderListWithTemplate } from "./utils.mjs"

function productCardTemplate(product){
    const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice
    return `
        <li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}&category=${product.Category}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p>
              ${isDiscounted ? "<p class='product-card__discount'>Discounted</p>" : ''}
            </a>
          </li>
    `
}

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category
        this.dataSource = dataSource
        this.listElement = listElement
        this.products = [];
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.products = list;
        
        this.renderList(this.products);
    }

    sortList(sortKey) {
        const sortedList = [...this.products];

        if (sortKey === "name") {
            sortedList.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
        } else if (sortKey === "price") {
            sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
        }

        this.renderList(sortedList);
    }

    renderList(productList) {

        this.listElement.innerHTML = ""; 
        
        renderListWithTemplate(productCardTemplate, this.listElement, productList, "afterbegin", false);
    }
}