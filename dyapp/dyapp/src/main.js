import Vue from 'vue';
// 阿里库
import './static/iconfont/iconfont.css';
// vue-awesome-swiper 挂载轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
// vue-video-player 挂载播放器样式
import VueVideoPlayer from 'vue-video-player';
import 'vue-video-player/src/custom-theme.css';
import 'video.js/dist/video-js.min.css';
// 主配置
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from './components/toast/toast';

Vue.prototype.$toast = Toast;
Vue.use(VueAwesomeSwiper);
Vue.use(VueVideoPlayer);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
