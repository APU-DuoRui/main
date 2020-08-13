<template>
  <div class="content">
    <div class="box">
      <!-- 头部模块 -->
      <!-- 头部模块左边 -->
      <div class="box1">
        <i class="el-icon-s-fold"></i>
        <img class="img" src="~@/assets/img/logn02.png" alt />
        <span>后台管理</span>
      </div>
      <!-- 头部模块右边 -->
      <div class="box2">
        <div>
          <img src="~@/assets/img/logn02.png" alt />
        </div>
        <span>李达,您好!!</span>
        <button>退出</button>
      </div>
    </div>
    <!--  -->
    <div class="btn">
      <!-- 左边列表 -->
      <div class="left">侧边栏</div>
      <!-- 内容 -->
      <div class="right">内容</div>
    </div>
  </div>
</template>

<script>
export default {
  daat() {
    return {};
  },
};
</script>

<style lang="less">
.content {
  width: 100%;
  .box {
    height: 60px;
    // 头部左边
    .box1 {
      position: relative;
      .el-icon-s-fold {
        width: 24px;
        height: 20px;
        font-size: 30px;
        margin: 10px 0 0 24px;
      }
      .img {
        width: 33px;
        height: 26px;
        margin: 8px 0 0 24px;
        background: linear-gradient(#1493fa 18%, #02c4fa 100%);
      }
      span {
        position: absolute;
        top: 8px;
        left: 120px;
        font-weight: 700;
        font-size: 22px;
        color: #49a1ff;
      }
    }
    // 头部右边
    .box2 {
      position: relative;
      div {
        position: absolute;
        top: -30px;
        right: 180px;
        width: 40px;
        height: 35px;
        border-radius: 50%;
        background-color: red;
        overflow: hidden;
      }
      img {
        width: 40px;
        height: 35px;
      }
      span {
        width: 75px;
        position: absolute;
        top: -25px;
        right: 100px;
        white-space: nowrap;
      }
      button {
        position: absolute;
        top: -30px;
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
  }
  .btn {
    width: 100%;
    background-color: #fffffc;
    box-shadow: 0px 2px 5px 6px rgba(63, 63, 63, 0.35);
    .left {
      float: left;
      width: 20%;
      height: 769px;
      background: #ffffff;
      // box-shadow: 0px 2px 5px 6px rgba(63, 63, 63, 0.35);
      margin-top: -5px;
      //  z-index:9999;
    }
    .right {
      float: right;
      width: 80%;
      height: 769px;
      background-color: #e8e9ea;
    }
  }
}
</style>