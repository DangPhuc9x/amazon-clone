export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

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
}

export function removeFromCart(productId) {
    cart = cart.filter((cartItem) => {
        if (productId === cartItem.productId) {
            return false;
        } else {
            return true;
        }
    });
}