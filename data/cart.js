export let cart =  JSON.parse(localStorage.getItem('cart'));
if(!cart){
   cart = [
    {
        productId :'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 1,
        deliveryOptionId:'1'
    }
];
} 


function saveToStorage(){
    localStorage.setItem('cart' ,JSON.stringify(cart))
}
export function addToCart(productId){
         // check for if button alreaady exist
        let matchingItem;

        cart.forEach((item) => {
            if(productId === item.productId){
                matchingItem = item;
            }
        })

        if(matchingItem){
            matchingItem.quantity += 1;
        }
        else{
        cart.push({
            productId : productId,
            quantity : 1,
            deliveryOptionId:'1'
        })
        }
        saveToStorage();
    }
     // total No. of items present in cart
   export function UpdateCartQuantity(){
         let cartQuantity = 0;

            cart.forEach((item) => {

                cartQuantity += item.quantity;

            });
        //updating on pg
       document.querySelector('.js-cart-quantity').innerHTML =  cartQuantity;
    }

export  function removefromcart(productId){
        const newcart = [];
        
        cart.forEach((cartItem) => {
            if(cartItem.productId !== productId){
                newcart.push(cartItem);
            }
        })

        cart = newcart;
        saveToStorage();
    }

export function updateDeliverOption(productId,deliveryOptionId){
        let matchingItem;

        cart.forEach((item) => {
            if(productId === item.productId){
                matchingItem = item;
            }
        })
        matchingItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
    }