import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
  // @ts-ignore
  vuetify,
  render: (h: any) => h(App)
}).$mount('#app');
