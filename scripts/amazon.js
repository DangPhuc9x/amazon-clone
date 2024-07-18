import {cart} from '../data/cart.js';

let productsHTML = '';

// Take each product and store at (object)product and run the function
// To show all of the product inside product
products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
            <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="js-add-to-cart-button add-to-cart-button button-primary"
            data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart-button')
    .forEach((button) => {
        button.addEventListener('click', () => {
            // HTML part: data-product-id -> JS part: .dataset.productId
            const productId = button.dataset.productId;
            let machingItem;

            // Check if select product exist inside cart
            // If yes, save to machingItem
            cart.forEach((item) => {
                if (productId === item.productId) {
                    machingItem = item;
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

            // Count total quantity
            let cartQuantity = 0;

            cart.forEach((item) => {
                cartQuantity+= item.quantity;
            });

            // Update total quantity to webpage (top right)
            document.querySelector('.js-cart-quantity')
                .innerHTML = cartQuantity;
        });
    });
