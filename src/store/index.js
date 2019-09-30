import Vue from 'vue';
import Vuex from 'vuex';
import { eventBus } from '../components/App';


Vue.use(Vuex);

const priorityStatuses = ['new', 'remind'];
const appointZero = value => value < 10 ? `0${value}` : value;
const formDate = dateSource => {
  const day = appointZero(dateSource.getDay() + 1);
  const month = appointZero(dateSource.getMonth() + 1);
  const year = dateSource.getFullYear();
  const hours = appointZero(dateSource.getHours());
  const minutes = appointZero(dateSource.getMinutes());
  const seconds = appointZero(dateSource.getSeconds());
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};
const formCode = codeSource => `${codeSource < 100 ? '0' : ''}${codeSource < 10 ? '0' : ''}${codeSource}`;
const formArea = areaSource => `${areaSource < 10 ? '0' : ''}${areaSource}`;
const formCoupon = couponData => {
  const { code, area } = couponData;
  const newCoupon = {
    ...couponData,
    code: formCode(code),
  };
  if (area) newCoupon.area = formArea(area);
  return newCoupon;
};


export default new Vuex.Store({
  state: {
    exchangeRates: [],
    coupons: [],
  },
  mutations: {
    UPDATE_COUPONS(state, { data }) {
      const { code, type, status } = data;
      const updatedCouponIndex = state.coupons.findIndex(coupon => (
        (Number(coupon.code) === code && coupon.type === type)
      ));
      const newCoupons = [...state.coupons].map(coupon => ({
        ...coupon,
        status: coupon.status === 'new' ? 'newPending' : 'remindPending'
      }));
      if (updatedCouponIndex === -1 && status !== 'delete') {
        newCoupons.push(formCoupon(data));
      } else if (status === 'delete') {
        newCoupons.splice(updatedCouponIndex, 1);
      } else {
        newCoupons[updatedCouponIndex] = formCoupon(data);
      }
      newCoupons.sort((couponA, couponB) => {
        if (priorityStatuses.includes(couponA.status) && !priorityStatuses.includes(couponB.status)) return -1;
        return 1;
      });
      state.coupons = newCoupons;
    },
    UPDATE_RATES(state, { data: updatedRates }) {
      const newRates = [...state.exchangeRates];
      updatedRates.forEach(({ type, ratio }) => {
        const stateRate = newRates.find(rate => rate.currency === type);
        if (!stateRate) {
          newRates.push({ currency: type, ratio, date: formDate(new Date()) });
        } else if (stateRate.ratio !== ratio) {
          stateRate.ratio = ratio;
          stateRate.date = formDate(new Date());
        }
      });
      state.exchangeRates = newRates;
    }
  },
  actions: {
    INIT_SOCKET({ dispatch }) {
      const createSocket = () => {
        const socket = new WebSocket('ws:localhost:3000');
        socket.onopen = () => console.log('WebSocket соединение установлено');
        socket.onclose = () => {
          console.log('WebSocket соединение не установлено');
          setTimeout(createSocket, 10000);
        };
        socket.onmessage = event => dispatch('PROCESS_SOCKET_MESSAGE', { event });
      };
      createSocket();
    },
    PROCESS_SOCKET_MESSAGE({ commit }, { event }) {
      const { type, data } = JSON.parse(event.data);
      if (type === 'PLAY_VIDEO') {
        eventBus.$emit('PLAY_VIDEO');
      } else {
        commit(type, { data });
        if (type !== 'UPDATE_COUPONS' || !priorityStatuses.includes(data.status)) return;
        const newStatus = data.status === 'new' ? 'newPending' : 'remindPending';
        setTimeout(() => {
          commit(type, { data: { ...data, status: newStatus } })
        }, 5000);
      }
    }
  },
  getters: {
    RATES: state => state.exchangeRates,
    COUPONS: state => state.coupons
  }
})
