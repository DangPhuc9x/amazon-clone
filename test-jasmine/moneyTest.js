import { formatCurrency } from "../scripts/utils/money.js";

// Create, name a test suite
describe('TEST SUITE: formatCurrency', () => {
    // Create, name a test
    it('convert cents into dollars', () => {
        // Compare 2 values
        // Return a method/object
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    
    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    
    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(200.5)).toEqual('2.01');
    });
    
    it('rounds down to the nearest cent', () => {
        expect(formatCurrency(200.4)).toEqual('2.00');
    });
})
