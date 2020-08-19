// 1.导入 $http
import $http from '@/app/registerlst.js'

// 2.写 封装axios请求

// 发布题目
function release(params) {
    return $http({
        // 请求 路径 url
        url: '/question/add',
        // 请求方法 GET /POST
        method: 'POST',
        // 服务器需要的参数
        params

    })
}
// 获取题目信息
function information(params) {
    return $http({
        // 请求路径 url
        url: "/question/one",
        // 请求方法 GET /POST
        method: "",
        // 服务器需要的参数
        params

    })
}
// 设置题目状态
function state(params) {
    return $http({
        // 请求路径 url
        url: '/question/status',
        // 请求方法 GET /POST 
        method: 'POST',
        // 服务器需要的参数
        params
    })
}
// 删除题目
function remove(params) {
    return $http({
        // 请求路径url
        url: "/question/remove",
        // 请求的方法
        method: 'POST',
        // 参数
        params
    })
}

// 3.暴露接口
export { release, information, state,remove }