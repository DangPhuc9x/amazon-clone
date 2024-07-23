import { getProduct } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    let paymentSummaryHTML = ``;
    let quantityTotal = 0;
    let itemsPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const machingProduct = getProduct(productId);

        quantityTotal += cartItem.quantity;
        itemsPriceCents += (machingProduct.priceCents * cartItem.quantity);

        // Get the deliveryOptionId of item
        const deliveryOptionId = cartItem.deliveryOptionId;

        // Get the info about delivery option of item
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        shippingPriceCents += deliveryOption.priceCents
    });

    const totalBeforeTaxCents = itemsPriceCents + shippingPriceCents;
    const estimatedTaxCents = (totalBeforeTaxCents / 10);
    const ordertotalCents = totalBeforeTaxCents + estimatedTaxCents;

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
