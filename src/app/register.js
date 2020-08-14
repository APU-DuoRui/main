// 1. 导入axios
import axios from 'axios'
// 2. 声明一个变量来存储当前的基地址
let sum = axios.create({
    // 3.可以将测试的地址赋值的 baseURL
    baseURL: process.env.VUE_APP_URL
})
// 第一步 ： 定义一个对应的api的文件  定义一个获取验证码的方法
// 4.声明一个函数 可以帮我们发送axios 请求
function getPhoneColdeApi(data) {
    // 4.1 将处理好的数据 返回出去
    return sum({
        // 4.2 请求 url 的路径
        url: "",
        // 4.3 请求的方式  GET /POST 
        method: "",
        // 4.4 设置 cookie 因为在谷歌浏览器默认是支持跨域的 可以设置withCredentials 为true  因为默认是false
        withCredentials: true,
        data:data
    })
}
// 将数据返回出去
export { getPhoneColdeApi }