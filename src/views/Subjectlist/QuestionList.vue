<template>
  <div class="btn">
    <el-container>
      <el-header>
        <!-- 第一层 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="90px">
          <!-- 学科 -->
          <el-row>
            <el-col :span="5">
              <el-form-item label="学科">
                <el-select v-model="formInline.region" placeholder="请选择学科">
                  <el-option value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 阶段 -->
            <el-col :span="5">
              <el-form-item label="阶段">
                <el-select v-model="formInline.region" placeholder="请选择阶段">
                  <el-option label="区域一" value></el-option>
                  <el-option label="区域二" value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 企业 -->
            <el-col :span="5">
              <el-form-item label="企业">
                <el-select v-model="formInline.region" placeholder="请选择企业">
                  <el-option label="区域一" value></el-option>
                  <el-option label="区域二" value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 题型 -->
            <el-col :span="5">
              <el-form-item label="题型">
                <el-select v-model="formInline.region" placeholder="请选择题型">
                  <el-option label="区域一" value></el-option>
                  <el-option label="区域二" value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第二层 -->
          <!-- 难度 -->
          <el-row>
            <el-col :span="5">
              <el-form-item label="难度">
                <el-select v-model="formInline.region" placeholder="请选择难度">
                  <el-option value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 作者 -->
            <el-col :span="5">
              <el-form-item label="作者">
               <el-input  v-model="formInline.region"></el-input>
              </el-form-item>
            </el-col>
            <!-- 日期 -->
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="formInline.region" placeholder="请选择日期">
                  <el-option label="区域一" value></el-option>
                  <el-option label="区域二" value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 题型 -->
            <el-col :span="5">
              <el-form-item label="题型">
                <el-select v-model="formInline.region" placeholder="请选择题型">
                  <el-option label="区域一" value></el-option>
                  <el-option label="区域二" value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第三层 -->
          <el-col :span="11">
            <el-form-item label="标题" >
              <el-input  v-model="formInline.user"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item class>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button class="obliterate" @click="onSubmit">清除</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">+新增学科</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-header>
      <!-- 表格 -->
      <el-main>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="题目" width="180"></el-table-column>
          <el-table-column prop="address" label="学科.阶段"></el-table-column>
          <el-table-column prop="address" label="题型"></el-table-column>
          <el-table-column prop="address" label="企业"></el-table-column>
          <el-table-column prop="address" label="创建者"></el-table-column>
          <el-table-column prop="address" label="状态"></el-table-column>
          <el-table-column prop="address" label="访问量"></el-table-column>
          <el-table-column prop="address" label="操作"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //声明一个数组
      tableData: [],
      // 表单
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      alert("你点击了我");
    },
  },
};
</script>

<style lang="less">
.btn {
  height: 100%;
  .el-header {
    height: 228px !important;
    background-color: #fff;
    color: #333;
    margin: 10px 12px;
    padding: 30px 0 !important;
    .el-form-item {
      margin-left: 20px;
      color: #8e8f8f;
      .el-input {
        width: 100px;
        padding: 0 !important;
      }
    }
  }
  // 表格的左边 需要向左偏移20
  /* .el-table th > .cell {
    padding-left: 20px !important;
  } */
  .el-table .cell {
    margin-left: 10px;
  }
  // 企业列表的内容
  .el-main {
    height: 100%;
    color: #333;
    padding: 5px 12px !important;
  }
}
/* .el-form-item__content{
  margin: 0 20px 0 5px;
} */
.el-input--suffix .el-input__inner {
  width: 200px;
  position: relative;
}
.el-icon-arrow-up:before {
  content: "\e6e1";
  position: absolute;
  right: 105px;
  top: 0;
}
// 

// 标题
.caption {
  position: absolute;
  left: 0;
  top: 0;
  width: 458px !important;
}
.obliterate {
  margin-left: 25px ;
}
</style>