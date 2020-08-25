<template>
  <el-container>
    <el-header>
      <!-- 左边头部 -->
      <div class="box1">
        <i style="margin-bottom: 20px;" @click="collapse=!collapse" class="el-icon-s-fold"></i>
        <img class="img" src="~@/assets/img/logn02.png" alt />
        <span>后台管理</span>
        <!-- 右边头部 -->
        <div class="box2">
          <div v-if="$store.state.userInfo != ''">
            <!-- 防止异步操作  等img的数据返回 一起操作   所以路径不能等于空 -->
            <img :src="baseUrl + '/' + $store.state.userInfo.avatar" alt />
          </div>
          <p>{{$store.state.userInfo.username}},您好!!</p>
          <button @click="logOut">退出</button>
        </div>
      </div>
    </el-header>
    <!-- 侧边列表 -->
    <el-container class="content">
      <!-- default-active : 默认选中某一个 -->
      <!-- disabled 禁止(点击) -->
      <el-aside width="auto">
        <el-row>
          <el-col :span="24">
            <el-menu
              :default-active="$route.path"
              :router="true"
              class="el-menu-vertical-demo"
              :collapse="collapse"
              text-color="#000"
              active-text-color="#008aff"
            >
              <!-- 判断当前的账号是否是没有权限 如果没有则不显示菜单栏 -->
              <!-- 所以使用vi-if  与 v-for 不能一起 使用 -->
              <!-- 创建一个占位符  template -->
              <!-- 遍历 路由 -->
              <!--  <template v-for="(item, index) in $router.options.routes[2].children">
                判断当前是否是有权限
                <el-menu-item
                  :key="index"
                  :index="item.path"
                  v-if="item.meta.roles.includes($store.state.role)"
                >
                  字体图标
                  <i :class="item.meta.icon"></i>
                  当前的头部标题 的字体
                  <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
              </template>-->
               <!-- 代码冗余 有权限管理 -->
              <el-menu-item
                v-if="['超级管理员', '管理员', '老师'].includes($store.state.role)"
                index="/components/headlistes/Datalist"
              >
                <i class="el-icon-pie-chart"></i>
                <span slot="title">数据概览</span>
              </el-menu-item>
              <el-menu-item
                v-if="['超级管理员', '管理员',].includes($store.state.role)"
                index="/components/headlistes/UsersList"
              >
                <i class="el-icon-user"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
              <el-menu-item
                v-if="['超级管理员', '管理员', '老师'].includes($store.state.role)"
                index="/components/headlistes/QuestionList"
              >
                <i class="el-icon-collection"></i>
                <span slot="title">题库列表</span>
              </el-menu-item>
              <el-menu-item
                v-if="['超级管理员'].includes($store.state.role)"
                index="/components/headlistes/CompaniesList"
              >
                <i class="el-icon-office-building"></i>
                <span slot="title">企业列表</span>
              </el-menu-item>
              <el-menu-item
                v-if="['超级管理员', '管理员', '老师','学生'].includes($store.state.role)"
                index="/components/headlistes/SubjectList"
              >
                <i class="el-icon-notebook-1"></i>
                <span slot="title">学科列表</span>
              </el-menu-item>
              <!-- // 简单 但是没有权限管理
              <el-menu-item index="/components/headlistes/Datalist">
                <i class="el-icon-pie-chart"></i>
                <span slot="title">数据概览</span>
              </el-menu-item>
              <el-menu-item index="/components/headlistes/UsersList">
                <i class="el-icon-user"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
              <el-menu-item index="/components/headlistes/QuestionList">
                <i class="el-icon-collection"></i>
                <span slot="title">题库列表</span>
              </el-menu-item>
              <el-menu-item index="/components/headlistes/CompaniesList">
                <i class="el-icon-office-building"></i>
                <span slot="title">企业列表</span>
              </el-menu-item>
              <el-menu-item index="/components/headlistes/SubjectList">
                <i class="el-icon-notebook-1"></i>
                <span slot="title">学科列表</span>
              </el-menu-item>-->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <!-- 设置路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入封装好的接口
import { getInfo } from "@/port/SubjectAPP/app.js";
// 导入封装好的token (将获取token时分离，就成为一个组件)
// 导入删除 token
import { getremove, getLogin } from "@/app/token.js";
export default {
  // 1.使用created 查看有没有 token
  created() {
    // 1.1判断当前的页面没有吗token 如果没有则跳转登录页面 如果有token 则不会跳转登录(会默认在原来的主页面)
    if (!getLogin("token")) {
      this.$router.push("/login");
      return;
    }
    // console.log("router:", this.$route.path);
    console.log("router:", this.$router);
    // 2.用户进页面 默认 发送axios请求
    // 获取用户信息
    getInfo().then((res) => {
      // 调用vuex  封装好的数据
      this.$store.state.userInfo = res.data.data;
      // window.console.log("用户信息:", res);
      // console.log("111", res);
      // 判断当前是不是没有权限 如果没有权限则返回到登录页面
      if (res.data.data.status == 0) {
        // 提示用户
        this.$message.warning("请你联系管理员");
        // 删除token
        getremove("token");
        // 跳转登录页面
        this.$router.push("/login");
      } else {
        // 获取角色
        this.$store.state.role = res.data.data.role;
        console.log("获取角色", this.$store.state.role);
        if (!this.$route.meta.roles.includes(res.data.data.role)) {
          // 提示用户
          this.$message.error("你没有权限访问该页面");
          // 删除token
          getremove("token");
          // 跳转登录页面
          this.$router.push("/login");
        }
      }
    });
    console.log(this.$router.options.routes[2].children);
  },
  // (2)定义方法
  data() {
    // 将处理好的数据 返回出去
    return {
      collapse: false,
      // 定义路由(是不是开启)
      // router: true,
      // 头像图片
      baseUrl: process.env.VUE_APP_URL,
      userInfo: "",
    };
  },
  // (3)统一管理方法
  methods: {
    // 1.点击退出登录
    logOut() {
      this.$confirm("是不是退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 调用 token封装好的api 删除token
          getremove("token");
          // 跳转登录(组件)页面
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 2.侧边栏
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    /*   // 3.  点击 添加到嵌套路由
    skipRouter(str) {
      // 跳转嵌套
      this.$router.push(str);
    }, */
  },
};
</script>

<style lang="less">
@import "~@/assets/css/headlistes.css";
// 头部左边
.box1 {
  position: relative;
  .el-icon-s-fold {
    width: 24px;
    height: 20px;
    font-size: 30px;
    margin: 10px 0 0 5px;
  }
  .img {
    width: 33px;
    height: 26px;
    margin: 15px 0 0 15px;
  }
  span {
    position: absolute;
    top: 13px;
    left: 95px;
    font-weight: 700;
    font-size: 20px;
    color: #49a1ff;
  }
}
// 头部右边
.box2 {
  position: relative;
  div {
    position: absolute;
    top: -45px;
    right: 195px;
    width: 40px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 40px;
      height: 35px;
    }
  }
  p {
    width: 85px;
    position: absolute;
    top: -37px;
    right: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button {
    position: absolute;
    top: -44px;
    right: 10px;
    color: #fff;
    background-color: #0a9eff;
    border-radius: 5px;
    width: 60px;
    height: 35px;
    outline: none;
    border: none;
  }
}
.content {
  width: 100%;
  height: 600px;
}
// 动画
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>