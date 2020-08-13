// (1)模块
// 1.导入vue模块
import Vue from 'vue'
// 2.导入路由
import Router from 'vue-router'
//使用路由
Vue.use(Router)
// (2)导入组件  (懒加载技术  --随用随载--)
// 1.声明一个主页件 面组(导入组件)
const headlist = () => import('@/components/headlist.vue')
// 2.声明一个登录 组件(导入组件)
const login = () => import('@/views/login/login.vue')
// 3.声明一个注册 组件(导入组件)
const register = () => import('@/views/login/register.vue')
// (3)使用路由
const routes = [
    // 1.重定向 第一个页面 就登录页面
    { path: '/', redirect: "/login" },
    // 2.登录对象(组件)
    { path: '/login', component: login },
    // 3.注册对象(对象)
    { path: "/register", component: register },
    // 4.后台主页面对象(组件)
    { path: '/headlist', component: headlist }
]

// (4)将vue实例化出去
let router = new Router({
    routes
})
// (5)这一段代码的作用是 可以减小编写代码的bug
Vue.config.productionTip = false;
// (6)将数据传出去
export default router