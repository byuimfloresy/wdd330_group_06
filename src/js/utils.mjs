// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position, clear){
  if (clear == true){
    parentElement.innerHTML = ""
    return
  }
  const productsTemplate = list.map(product => templateFn(product))
  parentElement.insertAdjacentHTML(position, productsTemplate.join(''))
}

export function addUniqueProductsToCart(uniqueProduct){
        // Get local storage
        let localStorage = getLocalStorage("so-cart") || [];
        console.log("running loop")
        if (localStorage.length < 1){
          uniqueProduct.qty = 1
          setLocalStorage("so-cart", [uniqueProduct]);
          return
        }
        
        let productFound = false
        localStorage = localStorage.map(product => {
            if (uniqueProduct.Id == product.Id){
              productFound = true
                product.qty += 1
            }
            console.log("Final product")
            console.log(product)
            return product
        })

        if(productFound){
          setLocalStorage("so-cart", localStorage);
        }else{
          uniqueProduct.qty = 1
          localStorage.push(uniqueProduct)
          setLocalStorage("so-cart", localStorage);
        }
        
        
    }

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const count = cartItems ? cartItems.length : 0;
  const cartElement = document.querySelector(".cart");

  if (cartElement) {
    let countElement = cartElement.querySelector(".cart-count");

    if (!countElement) {
      countElement = document.createElement("span");
      countElement.classList.add("cart-count");
      cartElement.appendChild(countElement);
    }

    countElement.innerText = count;
    countElement.style.display = count > 0 ? "block" : "none";
  }
}

export function alertMessage(message, scroll=true){
  document.querySelector("main")
}
