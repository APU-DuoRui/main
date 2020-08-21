// 1.导入 $http
import $http from '@/app/registerlst.js'

// 2.写 封装axios请求
// 用户列表
function getUserListList(params) {
    return $http({
        url: '/user/list',
        params
    })
}
//用户状态设置
function setUserListStatus(data) {
    return $http({
        url: '/user/status',
        method: 'post',
        data
    })
}
// 用户添加
function addUserList(data) {
    return $http({
        url: '/user/add',
        method: 'post',
        data
    })
}
// 用户编辑
function editUserList(data) {
    return $http({
        url: '/user/edit',
        method: 'post',
        data
    })
}
// 用户删除
function delUserList(data) {
    return $http({
        url: '/user/remove',
        method: 'post',
        data
    })
}

//3.暴露接口
export {
    getUserListList,
    setUserListStatus,
    addUserList,
    editUserList,
    delUserList
}