// (1).导入axios
// 如果要使用 ElementUI框架 必须要导入模块
import { Message } from 'element-ui'
import axios from 'axios'
// 1. 声明一个变量来存储当前的基地址
let $http = axios.create({
    // 2.可以将测试的地址赋值的 baseURL
    baseURL: process.env.VUE_APP_URL,
    // 2.1设置 cookie 因为在谷歌浏览器默认是支持跨域的 可以设置withCredentials 为true  因为默认是false
    withCredentials: true
})
// 第一步 ： 定义一个对应的api的文件  定义一个获取验证码的方法
// 3.声明一个函数 可以帮我们发送axios 请求
/* 写一个api 返回(验证码)的接口 */
function getPhoneColdeApi(data) {
    // 3.1 将处理好的数据 返回出去
    return $http({
        // 3.2 请求 url 的路径
        url: "/sendsms",
        // 3.3 请求的方式  GET /POST 
        method: "POST",
        // 3.4 设置 cookie 因为在谷歌浏览器默认是支持跨域的 可以设置withCredentials 为true  因为默认是false
        // withCredentials: true,
        data
    })
}
/* 写 api 注册账号 */
function registerModule(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: "/register",
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}
// (2) 拦截器
// 4.1添加请求拦截器
$http.interceptors.request.use(function (response) {
    // 4.2在发送请求之前做些什么
    // 把响应错误的数据统一处理
    if (response.data.code == 200) {
        return response
    } else {
        // 4.3 这里使用 Element-ui框架  提示框
        // 5.添加响应拦截器
        Message.error(response.data.message)
        // 5.1对响应数据做点什么 (处理请求拦截与响应拦截)
        return Promise.reject(response.data.message)
    }
},
    // $http.interceptors.response.use(function (response) {
    // return response;
    // }, 
    function (error) {
        // 5.2对响应错误做点什么
        return Promise.reject(error);
    });

// 6.将数据返回出去
export { getPhoneColdeApi, registerModule }