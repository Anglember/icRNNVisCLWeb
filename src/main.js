import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex'
import store from './vuex/store'
import $ from 'jquery'
import VueDraggableResizable from 'vue-draggable-resizable'

window.jQuery = $
window.$ = $
import {
    messages
} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import '@/icons'
// echarts组件
import echarts from 'echarts'
import axios from 'axios'
Vue.prototype.$http=axios.create()
axios.defaults.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}
Vue.prototype.$echarts = echarts
Vue.use(Vuex)
Vue.component('vue-draggable-resizable',VueDraggableResizable)
// 百度地图插件
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    ak: 'zyGKmkFyjKqMF9Ka5P5y3Y9rGw7nVDHF'
})

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');