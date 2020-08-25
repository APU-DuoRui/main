// 1.导入 $http
import $http from '@/app/registerlst.js'

// 2.写接口
//——————————————————— (数据概览)面板数据接口  —————————————————————————
/* 写 api 面板数据接口 */
function title(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/data/title',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}
/* 写 api 企业题目数据统计 */
function statistics(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/data/statistics',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}
/* 写 api 面板数据接口 */
function hot_cities(data) {
    // 将处理好的数据返回出去
    return $http({
        // 请求 url 的路径
        url: '/data/hot_cities',
        // 请求的方式  GET /POST 
        method: "POST",
        // 服务器需要的参数 data
        data
    })
}



// 3.暴露接口
export { title, statistics, hot_cities }