import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

// Integration test
// Test website: How the page looks
//                            behaves
describe('TEST SUITE: renderOrderSummary', () => {
    let products;

    // Hooks: Run code for each test
    // beforeEach(): Run before each of the test below
    beforeEach(() => {
        // js-order-summary: to show the order when checking delete button
        // js-payment-summary: to support renderOrderSummary() function to be able to complete;
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify(
                products = [{
                    productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 3,
                    deliveryOptionId: '2'
                }]
            );
        });

        loadFromStorage();

        renderOrderSummary();
    });

    // afterEach(): Run after each of the test below
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })

    // How the page looks
    it('displays the cart', () => {
        expect(cart.length).toEqual(2);
        expect(document.querySelectorAll('.js-cart-item-container').length)
            .toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${products[0].productId}`).innerText)
            .toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${products[1].productId}`).innerText)
            .toContain('Quantity: 3');
    });

    // How the page behaves
    it('remove a product', () => {
        document.querySelector(`.js-delete-quantity-link-${products[0].productId}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length)
            .toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${products[0].productId}`))
            .toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${products[1].productId}`))
            .not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(`${products[1].productId}`);
    });
})