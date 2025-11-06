import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
            this.renderProductDetails();
    }

    addProductToCart(product) {
        const localStorage = getLocalStorage("so-cart") || [];
        localStorage.push(product)
        setLocalStorage("so-cart", localStorage);
    }

    async renderProductDetails() {
        const product = await this.dataSource.findProductById(this.productId);
        const brandName = document.querySelector(".product-detail__brand_name");
        const nameWithoutBrand = document.querySelector(".product-detail__without_brand_name");
        const price = document.querySelector(".product-card__price");
        const color = document.querySelector(".product__color");
        const description = document.querySelector(".product__description");
        const img = document.querySelector(".product-detail__img");

        brandName.innerHTML = product.Brand.Name;
        nameWithoutBrand.innerHTML = product.NameWithoutBrand;
        price.innerHTML = "$" + product.FinalPrice;
        color.innerHTML = product.Colors[0].ColorName;
        description.innerHTML = product.DescriptionHtmlSimple;
        img.src = product.Image;
    }
}