import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"

export default class CheckoutProcess{
    constructor() {
        this.cartItems = getLocalStorage("so-cart") || []
        this.subtotal = 0
        this.service = new ExternalServices()
    }

    init(){
        this.subtotal = this.subtotalCalculation()
        document.getElementById('checkout_zip_code')
            .addEventListener('keypress', this.totalCalculation.bind(this));

        document.getElementById('checkout_form_submit_btn')
             .addEventListener('click',this.checkout.bind(this))
    }

    subtotalCalculation(){
        const subtotal = this.cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0)
        const subtotalElement = document.getElementById("checkout_subtotal")
        subtotalElement.value = `$${subtotal.toFixed(2)}`
        return subtotal
    }

    totalCalculation(){
        let shippingEstimate = 0
        if (this.cartItems.length > 0) {         
            shippingEstimate = 10 + (this.cartItems.length - 1) * 2   
        }
        const tax = this.subtotal  * 0.06

        const taxElement  = document.getElementById("checkout_tax")
        taxElement.value = `${tax.toFixed(2)}`

        const shippingElement  = document.getElementById("checkout_shipping_estimate")
        shippingElement .value = `${shippingEstimate}`

        const orderTotalElement = document.getElementById("checkout_order_total")
        orderTotalElement.value =  `${(this.subtotal  + tax + shippingEstimate).toFixed(2)}`
    }

    packageItems() {
             const request = { 
             "orderDate": new Date().toISOString(),
              "fname": document.getElementById("checkout_first_name").value,
              "lname": document.getElementById("checkout_last_name").value,
              "street": document.getElementById("checkout_street_address").value,
              "city": document.getElementById("checkout_city").value,
              "state": document.getElementById("checkout_state").value,
              "zip": document.getElementById("checkout_zip_code").value,
              "cardNumber": document.getElementById("checkout_credit_card").value,
              "expiration": document.getElementById("checkout_expiration_date").value,
              "code": document.getElementById("checkout_security_code").value,
              "items": [],
              "orderTotal": document.getElementById("checkout_order_total").value,
              "shipping": document.getElementById("checkout_shipping_estimate").value,
              "tax": document.getElementById("checkout_tax").value
            }
            this.cartItems.forEach(x => {
                const item = {
                "id": x.Id,
                "name": x.Name,
                "price": x.ListPrice,
                "quantity": x.qty
              }
              request.items.push(item)
            })
              
            console.log("Sending data")
            console.log(request.items[0])
            console.log("Data Sent")
        return request
    }

    async checkout() {
        const isFormValid = document.forms.checkout_form.checkValidity()
        if (!isFormValid){
            console.log("Form not valid")
            return
        }
        const request = this.packageItems()
        console.log("Request object: ")
        console.log(request)
        
        try{
            this.service.checkout(request)
        }catch (err){
            console.log("Error sending request")
            console.log(err)
        }  
    }
}