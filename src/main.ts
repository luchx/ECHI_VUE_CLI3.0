import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 引入 mockjs
if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_MOCK) {
  require('@/mock');
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
