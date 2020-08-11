// (1)模块
// 1.导入vue模块
import Vue from 'vue'
// 2.导入app组件
import App from './App.vue'
// 3.ElementUI框架
import ElementUI from 'element-ui';
// css样式
import 'element-ui/lib/theme-chalk/index.css';
// 4.导入自己写好的路由
import router from '@/router/index'
// 使用ElementUI框架
Vue.use(ElementUI);
Vue.config.productionTip = false
// 将路由挂载 vue里面
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
