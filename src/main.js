// (1)模块
// 1.导入vue模块
import Vue from 'vue'
// 2.导入app组件
import App from './App.vue'
// 3.导入ElementUI框架
import ElementUI from 'element-ui';
// 导入ElementUI--css样式
import 'element-ui/lib/theme-chalk/index.css';
// 3.1导入全局的(公共样式)清除样式的index.css
import '@/assets/css/public.css'
// 3.2使用axios
import axios from 'axios'
import store from '@/store/index.js'
// 3.3将axios变成全局的
// Vue.prototype.$http = axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 4.导入自己写好的路由
import router from '@/router/index.js'
// 使用ElementUI框架
Vue.use(ElementUI);
Vue.config.productionTip = false


// 渲染一个路由的过程中，需要解析一个异步组件时发生的错误
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
// 将路由挂载 vue里面
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
