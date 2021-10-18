import jwt from 'jsonwebtoken';

export const formatNumber = (number) => Math.round(number * 100) / 100;

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const decodeToken = (token) => jwt.decode(token);
export const getExpiredDate = (token) =>
  new Date(decodeToken(token).exp * 1000);

export const getSubscribeFee = (fn, subsFee) => {
  if (fn <= 7) {
    return subsFee;
  }
  if (fn <= 11) {
    return subsFee + 20;
  }
  return subsFee + 40;
};
