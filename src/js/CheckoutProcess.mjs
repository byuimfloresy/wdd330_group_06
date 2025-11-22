
export default function CheckoutProcess(){
    const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
    cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;

    const subtotal = calculateSubtotal()
    const tax = calculateTax()

    const subtotalElement = document.getElementById("checkout_subtotal")
    subtotalElement.textContent = subtotal

    const orderTotalElement = document.getElementById("checkout_order_total")
    orderTotalElement.textContent = (subtotal + tax)

}

function calculateTotal(){
    // create another method to calculate and display tax, shipping, and the order total. This method should get called after the user fills in the zip code.
    const tax = 0
    const shippingEstimate = 0

    const taxElement  = document.getElementById("checkout_tax")
    taxElement.textContent = tax

    const shippingElement  = document.getElementById("checkout_shipping_estimate")
    shippingElement .textContent = shippingEstimate

    return (checkoutTax + shippingEstimate)
}