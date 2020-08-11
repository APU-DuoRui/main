// (1)模块
// 1.导入vue模块
import Vue from 'vue'
// 2.导入路由
import Router from 'vue-router'
// 3.使用axios
import axios from 'axios'
// 3.1将axios变成全局的
axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public'
//使用路由
Vue.use(Router)
// (2)导入组件
// 主页面组件
import headlist from '@/components/headlist.vue'
// 登录组件
import login from '@/views/login.vue'

// (3)使用路由
const routes = [
    { path: '/', redirect: login },
    { path: '/login', component: login },
    { path: '/headlist', component: headlist }
]

// (4)将vue实例化出去
let router = new Router({
    routes
})
Vue.config.productionTip = false;
// (5)将数据传出去
export default router