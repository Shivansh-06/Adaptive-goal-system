export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatCurrency = (value: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(value);
};

export const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`;
};
