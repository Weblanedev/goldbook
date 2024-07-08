 const formatAmount = (value: unknown) => {
    const unformattedValue = value?.toString().replace(/,/g, '');
    const formattedValue = unformattedValue ? parseFloat(unformattedValue).toFixed(2) : '';
    return `${formattedValue}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export default formatAmount;
