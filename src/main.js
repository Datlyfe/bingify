import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './sass/app.scss'
import resource from './plugins/resource';
import * as resources from './resources'
import VueYoutube from 'vue-youtube'
const nedb = require('nedb');
let likes = new nedb();
let watchList = new nedb();
Vue.prototype.$db={likes,watchList};

Vue.use(VueYoutube)
Vue.use(resource,resources);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
