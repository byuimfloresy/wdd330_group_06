import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const category = getParam("category");
const dataSource = new ExternalServices(category);
const productId = getParam("product");
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init()