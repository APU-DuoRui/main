// 1. 导入vue模块
import Vue from 'vue'
// 2.导入vuex模块
import Vuex from 'vuex'
// 使用vuex 
Vue.use(Vuex)

// 3. 声明一个变量来存储当前的vuex实例对象
const store = new Vuex.Store({
    state: {
        userInfo: '',
        role: "超级管理员",

    }
})

// 将处理好的数据暴露出来
export default store


