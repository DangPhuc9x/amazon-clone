export let cart = JSON.parse(localStorage.getItem('cart'));

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(button) {
    // HTML part: data-product-id -> JS part: .dataset.productId
    const productId = button.dataset.productId;
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
    if (machingItem) {
        machingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
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