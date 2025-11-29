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
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get("q");

        if (query) {
            // GLOBAL SEARCH: Fetch data from ALL categories
            const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
            
            // Trigger 4 requests at the same time
            const requests = categories.map((cat) => this.dataSource.getData(cat));
            
            // Wait for all of them to finish
            const results = await Promise.all(requests);
            
            // Combine the 4 arrays into one single list (flatten)
            this.products = results.flat();

            // Filter the big list
            this.products = this.products.filter((product) => 
                product.Name.toLowerCase().includes(query.toLowerCase())
            );

        } else {
            // NORMAL MODE: Just fetch the current category
            this.products = await this.dataSource.getData(this.category);
        }
        
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