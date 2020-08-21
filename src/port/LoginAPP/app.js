// 1.导入 $http
import $http from '@/app/registerlst.js'

// 2.写接口
//——————————————————— 登录接口  —————————————————————————
/* 写 api 登录账号 */
function getregister(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/login',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}

/* 写 api 登录--验证码 */
function Loginverificationcode(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/captcha?type=login',
        // 请求的方式  GET /POST 
        method: "GET",
        // 服务器需要的参数 data
        data
    })
}

// —————————————————  注册账号接口  ————————————————————————
/* 写一个api 返回(验证码)的接口 */
function getPhoneColdeApi(data) {
    // 3.1 将处理好的数据 返回出去
    return $http({
        // 3.2 请求 url 的路径
        url: "/sendsms",
        // 3.3 请求的方式  GET /POST 
        method: "POST",
        data: data
    })
}
/* 写 api 注册账号 */
function registerModule(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/register',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}
// 3.暴露接口
export { getregister, Loginverificationcode, getPhoneColdeApi,registerModule }