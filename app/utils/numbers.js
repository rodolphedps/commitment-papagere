
export const secureNumber = (value) => ((!value || Number.isNaN(value)) ? 0 : value);

export const financial = (number = 0, withoutDecimal) => {
  const securedValue = secureNumber(number);

  if (withoutDecimal && securedValue % 1 === 0) {
    return securedValue;
  }

  return Number.parseFloat(securedValue).toFixed(2);
};
