import express from 'express';
import expressWs from 'express-ws';
import { generateExchangeRates, generateCoupon } from './utils';
import config from './config';


const appServer = express();
expressWs(appServer);
appServer.ws('/', (ws, req, next) => {
  setInterval(() => {
    ws.send(JSON.stringify({
      type: 'UPDATE_COUPONS',
      data: generateCoupon()
    }));
  }, config.couponsRefreshTime);
  setInterval(() => {
    ws.send(JSON.stringify({
      type: 'UPDATE_RATES',
      data: generateExchangeRates()
    }));
  }, config.currenciesRefreshTime);
  setInterval(() => {
    ws.send(JSON.stringify({ type: 'PLAY_VIDEO' }));
  }, config.videoReplayTime);
});
appServer.listen(3000, () => console.log('Listening to port 3000.'));
