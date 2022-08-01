export const getNameCurrency = (Currency, key) => Currency.find(x => x.Series === key)?.Currency
