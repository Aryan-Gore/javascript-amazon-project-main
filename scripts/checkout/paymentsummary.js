import {cart} from '../../data/cart.js';
import {getproduct} from '../../data/products.js';
import {getdeliveryoption} from '../../data/deliveryOption.js';


export function renderpaymentsummary(){
 let productprice = 0;
  let shippingprice = 0;
 cart.forEach((cartitem) => {
   const product=  getproduct(cartitem.productId);

    productprice +=  product.price * cartitem.quantity;

   const deliveryoption=  getdeliveryoption(cartitem.deliveryOptionId)
   shippingprice += deliveryoption.price;

 })
  const totalbeforetax =  shippingprice+productprice;
  const tax = Number((totalbeforetax * 0.1).toFixed(2));

  const total = totalbeforetax+ tax;

  const paymentsummaryhtml =
  `
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">₹${productprice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${shippingprice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totalbeforetax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₹${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${total}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `

  document.querySelector('.js-payment-summary').innerHTML = paymentsummaryhtml;
  
}