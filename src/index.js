import Vue from 'vue';
import App from './components/App';
import store from './store';


document.body.style.margin = '0';
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
