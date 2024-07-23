export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    // TESTING SAMPLE
    if (!cart) {
        cart = [{
            productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 3,
            deliveryOptionId: '2'
        }]
    }
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId) {
    let machingItem;

    // Check if select product exist inside cart
    // If yes, save to machingItem
    cart.forEach((cartItem) => {
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
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        })
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter((cartItem) => {
        if (productId === cartItem.productId) {
            return false;
        } else {
            return true;
        }
    });

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.deliveryOptionId = deliveryOptionId;
        }        
    });

    saveToStorage();
}
