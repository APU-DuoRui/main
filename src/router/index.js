// (1)模块
// 1.导入vue模块
import Vue from 'vue'
// 2.导入路由
import Router from 'vue-router'
//使用路由
Vue.use(Router)
// (2)导入组件  (懒加载技术  --随用随载--)
// 1.声明一个主页页 面组(导入组件)
// const headlist = () => import('@/components/headlist.vue')
const headlistes = () => import('@/components/headlistes.vue')
// 2.声明一个登录 组件(导入组件)
const login = () => import('@/views/login/login.vue')
// 3.声明一个注册 组件(导入组件)
const register = () => import('@/views/login/register.vue')
// 4.导入嵌套的子组件  --数据概览
const Datalist = () => import('@/views/Subjectlist/Datalist.vue')
// 导入嵌套的子组件  -- 用户列表
const UsersList = () => import('@/views/Subjectlist/UsersList.vue')
// 导入嵌套的子组件  -- 题库列表
const QuestionList = () => import('@/views/Subjectlist/QuestionList.vue')
// 导入嵌套的子组件  -- 学科列表
const SubjectList = () => import('@/views/Subjectlist/SubjectList.vue')
// 导入嵌套的子组件  -- 模态框(添加学科内容)列表
const add = () => import('@/views/modal/add.vue')
// 导入嵌套的子组件  -- 企业列表
const CompaniesList = () => import('@/views/Subjectlist/CompaniesList.vue')
// (3)使用路由
const routes = [
    // 1.重定向 第一个页面 就登录页面
    { path: '/', redirect: "/login" },
    // 2.登录对象(组件)
    { path: '/login', component: login, meta: { title: "登录", role: ["超级管理员", "管理员", "老师", "学生"] } },
    // 3.注册对象(组件) 注册模态框
    { path: "/register", component: register },
    // 4.后台主页面对象(组件)
    {
        path: '/headlistes',
        component: headlistes,
        children: [
            // (重定向)
            { path: "/", redirect: "/views/headlistes/Datalist" },
            // 数据概览  子组件
            { path: "/views/headlistes/Datalist", component: Datalist, meta: { title: "数据概览", role: ["超级管理员", "管理员", "老师", "学生"] } },
            // 用户列表  子组件
            { path: "/views/headlistes/UsersList", component: UsersList, meta: { title: "用户列表" } },
            // 题库列表  子组件
            { path: "/views/headlistes/QuestionList", component: QuestionList, meta: { title: "题库列表" } },
            // 学科列表  子组件
            { path: "/views/headlistes/SubjectList", component: SubjectList, meta: { title: "学科列表" } },
            // 企业列表 子组件
            { path: "/views/headlistes/CompaniesList", component: CompaniesList, meta: { title: "企业列表" } },
            // 学科的摩模态框
            { path: "/views/modal/add", component: add }
        ]
    }
]

// (4)将vue实例化出去
let router = new Router({
    routes
})
// (5)这一段代码的作用是 可以减小编写代码的bug
Vue.config.productionTip = false;
//导入nprogress 
import NProgress from 'nprogress'
// css样式
import 'nprogress/nprogress.css'
import { Message } from 'element-ui' // Message===this.$message
import { getremove } from "@/app/token.js"
import store from "@/store/index.js"
// 路由导航守卫(前)
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (!to.meta.roles.includes(store.state.role)) {
        // if (!to.meta.roles.includes(store.state.role)) {
        // 提示用户 
        Message.error('您没权访问该页面')
        // 删除token
        getremove("token")
        // 跳转登录页面
        next('/login')
    } else {
        next()
        console.log("去哪里:", to)
        console.log("从哪来", from)
    }
})
// 导航守卫(后)
router.afterEach((to) => {
    // 1. 修改标题的名字
    document.title = to.meta.title
    NProgress.done()
})
// 防止重复使用 (导航重复避免了到当前的冗余导航)【就是减小报错】
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// (6)将数据传出去
export default router