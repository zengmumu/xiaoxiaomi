import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/flexible.min.js'
// import '....xxx.css'
import './assets/css/animate.min.css'

import Vant from 'vant'
import 'vant/lib/index.css'
import {Lazyload} from 'vant'
Vue.use(Lazyload);
// 挂载懒加载组件LazyLoad

// import Vant from './assets/vant/index'
// import './assets/vant/index.css'
Vue.use(Vant);
import { Notify } from 'vant';
Vue.use(Notify);
import { Toast } from 'vant';
Vue.use(Toast);
import axios from 'axios';
axios.defaults.baseURL = "http://520mg.com";
// 配置基础url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 配置post编码
// axios.defaults.withCredentials = true;
//跨域请求的全局凭证


// import axios from './assets/js/axios.min.js'
Vue.prototype.$http = axios;
//  挂载axios到vue的原型公用方法上面 
//  所有vue的实例都将拥有$http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
