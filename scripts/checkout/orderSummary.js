import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderOrderSummary() {
    let cartSummaryHTML = ``;

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        // Get product information
        const machingProduct = getProduct(productId);

        // Get the deliveryOptionId of item
        const deliveryOptionId = cartItem.deliveryOptionId;

        // Get the info about delivery option of item
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
            <div class="js-cart-item-container-${machingProduct.id}
                js-cart-item-container
                cart-item-container">
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
                        <div class="product-quantity
                            js-product-quantity-${machingProduct.id}">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="js-delete-quantity-link delete-quantity-link 
                                link-primary
                                js-delete-quantity-link-${machingProduct.id}"
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
                renderPaymentSummary();
            });
        });

    // Make when clicking to any where inside js-delivery-option
    // When clicking, deliveryOptionsHTML() will figure what to choose
    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        });
}