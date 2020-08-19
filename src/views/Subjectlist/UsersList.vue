<template>
  <div>
    <el-container>
      <el-header>
        用户列表
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="企业编号">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="请选择状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button  @click="onSubmit">清除</el-button>
            <el-button type="primary" @click="onSubmit">+新增企业</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
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
  background-color: #e8e9e8;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>