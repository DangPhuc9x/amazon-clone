import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

// Test Coverage
// Every statement of the test function
describe('TEST SUITE: addToCart', () => {
    it('adds a new product to the cart', () => {
        // Local storage when start reading doesn't always blank

        // Mock: Replace a method with a FAKE version
        // RESULT: Make localStorage.getItem('') and setItem('') to get fake value
        // spyOn (<Object to mock(1)>, <method to mock(2)>)
        // ...callFake(function that (2) do)
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        // After faking the cart inside the localStorage, 
        // we need to update cart element again
        loadFromStorage();

        addToCart('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
        expect(cart[0].quantity).toEqual(1);
    });

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

        addToCart('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
        expect(cart[0].quantity).toEqual(2);
    });
});
