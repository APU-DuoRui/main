// 1.导入 $http
import $http from '@/app/registerlst.js'

// 2.写接口
//——————————————————— 题库列表接口  —————————————————————————

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
        method: "POST",
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
// 编辑题目接口
function editTopic(params) {
    return $http({
        // 请求路径url
        url: "/question/edit",
        // 请求的方法
        method: 'POST',
        // 参数
        params
    })
}
// 题目列表
function list(data) {
    return $http({
        // 请求路径url
        url: "/question/list",
        // 请求的方法
        method: 'GET',
        // 参数
        data
    })
}
// 上传文件
function upload(data) {
    return $http({
        // 请求路径url
        url: "/question/upload",
        // 请求的方法
        method: 'GET',
        // 参数
        data
    })
}
// 3.暴露接口
export { release, information, state, remove, editTopic, list, upload }