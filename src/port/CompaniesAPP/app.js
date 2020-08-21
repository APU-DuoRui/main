// 1.导入 $http
import $http from '@/app/registerlst.js'

// (1) 封装axios请求
//——————————————————— 企业列表接口  —————————————————————————
// (2) 封装(写接口)
// a.获取企业列表
function enterpriselist(params) {
    return $http({
        // 请求的路径 url 
        url: "/enterprise/list",
        // 请求的方法 GET / POST
        method: 'GET',
        // 请求的参数
        params
    })
}
// b.企业添加
function enterpriseadd(params) {
    return $http({
        // 请求的路径 url 
        url: "/enterprise/add",
        // 请求的方法 GET / POST
        method: 'POST',
        // 请求的参数
        params
    })
}
// c.企业状态设置
function enterprisestatus(params) {
    return $http({
        // 请求的路径 url 
        url: "/enterprise/status",
        // 请求的方法 GET / POST
        method: 'POST',
        // 请求的参数
        params
    })
}
// c.企业删除数据
function enterpriseremove(params) {
    return $http({
        // 请求的路径 url 
        url: "/enterprise/remove",
        // 请求的方法 GET / POST
        method: 'POST',
        // 请求的参数
        params
    })
}
// c.企业编辑
function enterpriseedit(params) {
    return $http({
        // 请求的路径 url 
        url: "/enterprise/edit",
        // 请求的方法 GET / POST
        method: 'POST',
        // 请求的参数
        params
    })
}

// (3)暴露接口
export { enterpriselist, enterpriseadd, enterprisestatus, enterpriseremove, enterpriseedit }