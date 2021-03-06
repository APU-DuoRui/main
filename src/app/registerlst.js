// (1).导入axios
// 如果要使用 ElementUI框架 必须要导入模块
import { Message } from 'element-ui'
// 导入 token 的删除 token
import { getremove, getLogin } from '@/app/token.js'
import axios from 'axios'
import router from '@/router/index.js'
// 1. 声明一个变量来存储当前的基地址
let $http = axios.create({
    // 2.可以将测试的地址赋值的 baseURL
    baseURL: process.env.VUE_APP_URL,
    // 2.1设置 cookie 因为在谷歌浏览器默认是支持跨域的 可以设置withCredentials 为true  因为默认是false
    withCredentials: true
})

// (2) 拦截器
// 3.添加请求拦截器
$http.interceptors.request.use(
    function (config) {
        // 3.1在发送请求之做什么
        // console.log(config)
        // 这里可以做 存储token  
        // 在请求头 在请求报头添加xx  获取 token
        // config.headers.token = getLogin('token')
        config.headers.token = getLogin('token')
        return config
    }, function (error) {
        // 3.2对请求错误做些什么
        return Promise.reject(error)
    }
)

// 4.1添加请求拦截器
$http.interceptors.response.use(function (response) {
    // 4.2在发送请求之后做些什么
    // 把响应错误的数据统一处理
    if (response.data.code == 200) {
        //  4.3 如果等于200 就登录成功
        return response
        // 优化全局响应拦截token 参数错误
    } else if (response.data.code == 206) {
        // 4.4如果等于 206 就抛出异常 提示用户 需要重新登录 账号
        // token出错处理
        Message.error(response.data.message)
        // 清除掉 token 
        getremove("token");
        // 跳转登录页面(组件)
        router.push('/login')
        // 将处理好的数据返回出去
        return Promise.reject(response.data.message)
    } else {
        // 4.3 这里使用 Element-ui框架  提示框
        // 5.添加响应拦截器
        Message.error(response.data.message)
        // 5.1对响应数据做点什么 (处理请求拦截与响应拦截)
        return Promise.reject(response.data.message)
    }
},
    function (error) {
        // 5.2对响应错误做点什么
        // return Promise.reject(error);
        return Promise.reject(error)
    });
export default $http