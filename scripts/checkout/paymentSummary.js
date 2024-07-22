import { products } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    let paymentSummaryHTML = ``;
    let quantityTotal = 0;
    let itemsPriceCents = 0;
    let shippingPriceCents = 0;
    let totalBeforeTaxCents;
    let estimatedTaxCents;
    let ordertotalCents;

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let machingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                machingProduct = product;
            }
        });

        quantityTotal += cartItem.quantity;
        itemsPriceCents += (machingProduct.priceCents * cartItem.quantity);

        deliveryOptions.forEach((deliveryOption) => {
            if (deliveryOption.id === cartItem.deliveryOptionId) {
                shippingPriceCents += deliveryOption.priceCents
            }
        });

        console.log(`Name : ${machingProduct.name} - Quantity : ${cartItem.quantity}`);
        console.log(`Price 1pc : ${machingProduct.priceCents} - Price all : ${itemsPriceCents}`);

    });

    totalBeforeTaxCents = itemsPriceCents + shippingPriceCents;
    estimatedTaxCents = parseInt((totalBeforeTaxCents / 10).toFixed(0));
    ordertotalCents = totalBeforeTaxCents + estimatedTaxCents;

    paymentSummaryHTML += `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${quantityTotal}):</div>
            <div class="payment-summary-money">$${formatCurrency(itemsPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(ordertotalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `
    
    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}
