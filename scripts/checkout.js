import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

/* 
// Built-in Class
// Run immediately when execute
// FUNC: Handle asynchronous code
// INPUT: resolve: a function (similar to Jasmine's done() function)
//                 control when to go to next step
// NOTE: Promise().then(func())
// VER 1
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/

/*
// Callback style
loadProducts(() => {
    // CALLBACK function: a function run/call in the future
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
// EXAMPLE TEST CODE START
// Ex: To wait for both loadProducts() and loadCart() to finish
//     And then run func "render..."
loadProducts(() => {
    // CALLBACK function: a function run/call in the future
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
// EXAMPLE TEST CODE END
*/

/*
// VER 2
// resolve value will pass to the next .then
// value = 'value1'
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });
}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// Promise.all()
// FUNC: wait for all the promises to finish
// INPUT: Array of promises
// NOTES: All the resolve input param will be stored as an array
//        and save to the next input param of .then
//        values = ['value1', undefined]
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1');
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    renderOrderSummary();
    renderPaymentSummary();
});
