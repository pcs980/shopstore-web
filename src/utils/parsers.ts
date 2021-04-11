const decimalNumber = (number: number): string => {
  return Number(number).toFixed(2);
};

const truncateLongText = (text: string, maxSize = 30): string => {
  return text.length <= maxSize ? text : `${text.slice(0, maxSize - 3)}...`;
};

export {
  decimalNumber,
  truncateLongText
};
