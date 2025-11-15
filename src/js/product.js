import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const category = getParam("category");
const dataSource = new ProductData(category);
const productId = getParam("product");
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init()