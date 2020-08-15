// 1.封装一个token 存储到本地
function getToken(key, value) {
    // 1.1保存 登成功的token 
    window.localStorage.setItem(key, value)
}

// 2.获取token 
function getLogin(key) {
    // 2.2获取token
    // 将处理好的数据返回出去
    return window.localStorage.getItem(key)
}
// 3.删除token 
function getremove(key) {
    // 3.1删除token
    // 将处理好的数据返回出去
    return window.localStorage.removeItem(key)
}
// 将数据暴露出来
export { getToken, getLogin, getremove }