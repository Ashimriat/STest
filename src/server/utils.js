import { GROUPS, CURRENCIES } from './constants';

const generateOrder = () => Math.round(Math.random() * 15) || 1;
const generateWindow = () => Math.round((Math.random() + 1) * 5);
const generateGroup = () => Math.round(Math.random() * (GROUPS.length - 1));

export const generateCoupon = () => ({
  code: generateOrder(),
  type: GROUPS[generateGroup()],
  window: generateWindow(),
  status: Math.round(Math.random())
});

export const generateExchangeRates = () => CURRENCIES.map(currency => {
  const low = currency.ratioRange[0];
  const high = currency.ratioRange[1];
  return {
    type: currency.type,
    ratio: +(low + Math.random() * (high - low)).toFixed(2)
  };
});
