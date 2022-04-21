function formatCurrency(number, currency) {
    const formattedNumber = new Intl.NumberFormat('id-ID', { 
        style: 'currency',
        currency: 'idr'
     }).format(number);
     return formattedNumber;
}

module.exports = formatCurrency;
