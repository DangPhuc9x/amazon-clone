import { formatCurrency } from "../scripts/utils/money.js";

console.log('TEST SUITE: formatCurrency');

// BASIC TEST CASES
// Tests if the code is working
if (formatCurrency(2095) === '20.95') {
    console.log('test 1 passed');
} else {
    console.log('test 1 failed');
};

// EDGE TEST CASES
// Abnormal value (out of handle for the function)
if (formatCurrency(0) === '0.00') {
    console.log('test 2 passed');
} else {
    console.log('test 2 failed');
};

formatCurrency(2000.5) === '20.01'
    ? console.log('test 3 passed')
    : console.log('test 3 failed')

formatCurrency(2000.4) === '20.00'
    ? console.log('test 4 passed')
    : console.log('test 4 failed')