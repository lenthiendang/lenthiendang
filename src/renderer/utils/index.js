export const formatNumber = (number) => Math.round(number * 100) / 100;

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
