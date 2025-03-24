export const formatCurrency = (
  value: number,
  locale = "cs-CZ",
  currency = "CZK"
): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value
  );
};
