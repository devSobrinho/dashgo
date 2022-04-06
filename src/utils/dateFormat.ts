export const dateFormat = (date = new Date(), locale = 'pt-BR'): string => {
    const dateFormatted = Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: '2-digit',
        // minute: 'numeric',
        // second: '2-digit',
    }).format(date);

    return dateFormatted;
};
