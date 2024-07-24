function CartGenerate(localStorageKey) {
    const cart = {
        cartItems: undefined,
    
        // loadFromStorage: function() {
        // Shortcut
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        
            // TESTING SAMPLE
            if (!this.cartItems) {
                this.cartItems = [{
                    productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 3,
                    deliveryOptionId: '2'
                }]
            }
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(productId) {
            let machingItem;
        
            // Check if select product exist inside cart
            // If yes, save to machingItem
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    machingItem = cartItem;
                }
            });
        
            // If machingItem exist, add product quantity to 1
            // Else, add new product to cart
            // When add new product, default delivery option is 1
            if (machingItem) {
                machingItem.quantity += 1;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                })
            }
        
            this.saveToStorage();
        },
    
        removeFromCart(productId) {
            this.cartItems = this.cartItems.filter((cartItem) => {
                if (productId === cartItem.productId) {
                    return false;
                } else {
                    return true;
                }
            });
        
            this.saveToStorage();
        },
    
        updateDeliveryOption(productId, deliveryOptionId) {
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.deliveryOptionId = deliveryOptionId;
                }        
            });
        
            this.saveToStorage();
        }
    };

    return cart;
}

const cart = CartGenerate('cart-oop');
const businessCart = CartGenerate('businessCart-oop');

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart('77919bbe-0e56-475b-adde-4f24dfed3a04');
cart.addToCart('77919bbe-0e56-475b-adde-4f24dfed3a04');

console.log(cart);
console.log(businessCart);
