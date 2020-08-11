<template>
  <el-container>
    <el-header height="60px">头部</el-header>
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="10%">侧边栏</el-aside>
      <!-- 内容 -->
      <el-main width="90%">内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  daat() {
    return {};
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>