<template>
  <el-container>
    <el-header>
      <!-- 左边头部 -->
      <div class="box1">
        <i
          style="margin-bottom: 20px;"
          @click="isCollapse"
          :label="isCollapse"
          class="el-icon-s-fold"
        ></i>
        <img class="img" src="~@/assets/img/logn02.png" alt />
        <span>后台管理</span>
        <!-- 右边头部 -->
        <div class="box2">
          <div>
            <img src="~@/assets/img/tx.png" alt />
          </div>
          <p>李达,您好!!</p>
          <button @click="logOut">退出</button>
        </div>
      </div>
    </el-header>
    <el-container class="content">
      <!-- 侧边列表 -->
      <el-aside width="200px">
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :collapse="false"
              text-color="#ccc"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">导航一</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <!-- disabled 禁止 -->
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 内容 -->
      <el-main>内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入封装好的token (将获取token时分离，就成为一个组件)
import { getLogin } from "@/app/token.js";
// 导入删除 token
import { getremove } from "@/app/token.js";
export default {
  // 1.使用created 查看有没有 token
  created() {
    // 1.1判断当前的页面没有吗token 如果没有则跳转登录页面 如果有token 则不会跳转登录(会默认在原来的主页面)
    if (!getLogin("token")) {
      this.$router.push("/");
    }
  },
  // (2)定义方法
  data() {
    // 将处理好的数据 返回出去
    return {
      isCollapse: true,
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
    margin: 15px 0 0 24px;
  }
  span {
    position: absolute;
    top: 13px;
    left: 98px;
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
    top: -40px;
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
    top: -35px;
    right: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button {
    position: absolute;
    top: -42px;
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