import { GROUPS, CURRENCIES, STATUSES } from './constants';

const generateOrder = () => Math.round(Math.random() * 3) || 1;
const generateWindow = () => Math.round(Math.random() * 3 || 1);
const generateGroup = () => Math.round(Math.random() * (GROUPS.length - 1));

export const generateCoupon = () => {
  const coupon = {
    code: generateOrder(),
    type: GROUPS[generateGroup()],
    status: STATUSES[Math.round((Math.random() * 2))]
  };
  const shouldUseWindow = Math.round(Math.random());
  if (shouldUseWindow) coupon.area = generateWindow();
  return coupon;
};

export const generateExchangeRates = () => CURRENCIES.map(currency => {
  const low = currency.ratioRange[0];
  const high = currency.ratioRange[1];
  return {
    type: currency.type,
    ratio: +(low + Math.random() * (high - low)).toFixed(2)
  };
});
