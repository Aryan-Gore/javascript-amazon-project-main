    import {cart,removefromcart,updateDeliverOption} from '../../data/cart.js'
    import {products,getproduct} from '../../data/products.js'
    import {deliveryOptions} from '../../data/deliveryOption.js'
    import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
    import {renderpaymentsummary} from './paymentsummary.js'

  export  function renderOrderSummary(){
    let cartSummaryHtml = '';
    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        let matchingProduct;

        products.forEach((product)=>{

            if(product.id === productId){
                matchingProduct = product; 
            }
    
        })
        
        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId){
                deliveryOption = option;
            }
        })
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

            const datestring = deliveryDate.format('dddd, MMMM D');

        cartSummaryHtml += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${datestring}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    ${matchingProduct.price}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">
                        ${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">

                        Update
                    </span>

                    <div class="quantity-controls" style="display: none;">
                      <button class="js-increase" data-product-id="${matchingProduct.id}">+</button>
                        <span class="quantity-label js-qty">${cartItem.quantity}</span>

                        <button class="js-decrease" data-product-id="${matchingProduct.id}">−</button>
                    </div>

                    <span class="delete-quantity-link link-primary
                    js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryoptionHTML(matchingProduct,cartItem)}
                </div>
                </div>
            </div>

        `;

        
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;
    function deliveryoptionHTML(matchingProduct,cartItem){

        let html = ``;
            deliveryOptions.forEach((deliveryOption) =>{

            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

            const datestring = deliveryDate.format('dddd, MMMM D');

        const pricestring = deliveryOption.price===0
        ?'FREE'
        :`${deliveryOption.price}`
            
                const ischecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
                    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${ischecked?'checked':''}
                        class="delivery-option-input"
                        name="${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${datestring}
                        </div>
                        <div class="delivery-option-price">
                        ${pricestring} - Shipping
                        </div>
                    </div>
                    </div>
                `
            })
            return html;
        }

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                removefromcart(productId);
                renderpaymentsummary();

                const container = document.querySelector(`.js-cart-item-container-${productId}`) ;

                container.remove();
            })
        })
   //event listner to update when u chng the delivery date
        document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click',() => {
                const {productId,deliveryOptionId} = element.dataset;
                 updateDeliverOption(productId,deliveryOptionId);
                 renderOrderSummary();
                 renderpaymentsummary();
            
            })
        })

        document.querySelectorAll('.update-quantity-link')
  
        .forEach(link => {
    link.addEventListener('click', () => {
      const controls = link.nextElementSibling;
      controls.style.display =
        controls.style.display === 'none' ? 'inline-flex' : 'none';
    });
  });



    }

   
