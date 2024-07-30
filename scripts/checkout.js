import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
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

/*
// Promise.all() VER 3
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
*/

/*
// Promise.all() VER 4
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    console.log(`1. Values = ${values}`);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
// Async await
// FUNC: Make a function return a promise (Shortcut for Promise)
// NOTE: Return value will be saved in a param input inside next .then()
async function loadPage() {
    console.log('2. load page');

    await loadProductsFetch()

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
    
    const returnValue = 2;
    return returnValue;
}

loadPage().then((value) => {
    console.log('3. async next step');
    console.log(`4. Value = ${value}`);     // value = returnValue
});
*/

/*
// Async await
// FUNC: Make a function return a promise (Shortcut for Promise)
// NOTE: Return value will be saved in a param input inside next .then()
async function loadPage() {
    try {
        // // Create an error
        // // value 'error1' will be saved inside 'error' inside catch
        // throw 'error1';

        await loadProductsFetch()

        // Instead of .then(), await will return value of resolve() to itself <value>
        const value = await new Promise((resolve) => {
            // throw 'error2';
            loadCart(() => {
                const returnValue = 'await return';
                resolve(returnValue);
            });
        });
    } catch (error) {
        console.log('Unexpexted error. Please try again later.');
        console.log(error);
    }

    renderOrderSummary();
    renderPaymentSummary();
}
*/

// Async await
// FUNC: Make a function return a promise (Shortcut for Promise)
// NOTE: Return value will be saved in a param input inside next .then()
async function loadPage() {
    try {
        // // Create an error
        // // value 'error1' will be saved inside 'error' inside catch
        // throw 'error1';

        await loadProductsFetch()

        // Instead of .then(), await will return value of resolve() to itself <value>
        // reject(): function to create an error in the future
        const value = await new Promise((resolve, reject) => {
            // throw 'error2';
            loadCart(() => {
                // reject('error3');
                const returnValue = 'await return';
                resolve(returnValue);
            });
        });
    } catch (error) {
        console.log('Unexpexted error. Please try again later.');
        console.log(error);
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();
