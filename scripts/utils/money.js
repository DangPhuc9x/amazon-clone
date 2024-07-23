export function formatCurrency(priceCents) {
    // Without Math.round, the result will not be exact
    // 6.005.toFixed(2) = '6.00'
    // 8.005.toFixed(2) = '8.01'
    return (Math.round(priceCents) / 100).toFixed(2);
}