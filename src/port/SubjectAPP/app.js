// 1.导入 $http
import $http from '@/app/registerlst.js'

// 2.写接口
// ——————————————————— 学科列表接口  —————————————————————————

// 写一个获取用户信息的 接口
function getInfo() {
    return $http({
        // 请求的地址
        url: "/info",
        // 请求的方法  GET /POST
        method: "GET"
        // 请求的参数  没有
    })
}
/* 写 api 主页(学科组件)的--删除-- */
function remove(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/subject/remove',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}
/* 写 api 主页(学科组件)的--编辑-- */
function edit(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/subject/edit',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}
/* 写 api 主页(学科组件)的--添加-- */
function add(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/subject/add',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}
/* 写 api 主页(学科组件)的--学科列表-- */
function listes(params) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/subject/list',
        // 请求的方式  GET /POST 
        method: "GET",
        // 服务器需要的参数 data
        params: params
    })
}
/* 写 api 主页(学科组件)的--修改学科状态。启用或者禁用账号-- */
function status(params) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/subject/status',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        params: params
    })
}

// 6.将数据返回出去   第二步 
export { getInfo, remove, add, listes, status, edit }