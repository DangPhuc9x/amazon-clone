import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from '../data/products.js';
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let cartSummaryHTML = ``;

// Scan for each item(1) inside cart
// Search the info of the item(1) by take id of the item(1) 
//   and looping through each item's(2) id inside products.js
// If found, save item(2) info to machingProduct
// Show info to HTML with each item(1) by item(1)'s and item(2)'s info
// Add1: Show option about delivery date
// 
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let machingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            machingProduct = product;
        }
    });

    // Get the deliveryOptionId of item
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    // Loop through the delivery list inside deliveryOptions
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
        <div class="js-cart-item-container-${machingProduct.id} cart-item-container">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${machingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${machingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(machingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="js-delete-quantity-link delete-quantity-link link-primary"
                            data-product-id="${machingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(machingProduct, cartItem)}
                </div>
            </div>
        </div>
    `
})

// Using when machingProduct (inside products.js) and cartItem (inside cart.js) point to the same product
// FUNCTION: To create HTML part about delivery option
// NOTE: products.js                cart.js                            deliveryOptions.js
//        productId                 cartItemId
//                   machingProduct
//                                  cartItem.deliveryOptionId          deliveryOptions.id
//                                                            isChecked
function deliveryOptionsHTML(machingProduct, cartItem)
{
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${formatCurrency(deliveryOption.priceCents)} -`;

        // If the deliveryOption inside deliveryOptions.js match with deliveryOptionId inside cart.js
        // If yes, return true
        // If no, return false
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId
        
        html += `
            <div class="js-delivery-option delivery-option"
                data-product-id="${machingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${machingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
        `
    });

    return html;
}

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
        link.addEventListener(('click'), () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });
    });

// Make when clicking to any where inside js-delivery-option
// When clicking, deliveryOptionsHTML() will figure what to choose
document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
        })
    });
