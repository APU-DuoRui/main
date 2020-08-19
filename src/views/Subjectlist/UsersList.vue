<template>
  <div class="btn">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="用户编号">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.region" placeholder="请选择状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="onSubmit">清除</el-button>
            <el-button type="primary" @click="onSubmit">+新增用户</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <!-- 表格 -->
      <el-main>
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单
      form: {
        user: "",
        regin: "",
      },
      // 表格 声明一个空数组 来存储服务器返回的数据
      tableData: [],
    };
  },
  methods: {
    onSubmit() {
      console.log(1);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  height: 100%;
  .el-header {
    height: 100px !important;
    background-color: #fefff9;
    color: #333;
    padding: 30px 0 !important;
    margin: 10px 12px;
    .el-form-item {
      margin-left: 20px;
      .el-input {
        width: 100px;
        padding: 0 !important;
      }
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
  }

  .el-main {
    background-color: #e8e9e8;
    color: #333;
  }
}
</style>