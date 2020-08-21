<template>
  <div class="btn">
    <el-container>
      <el-header class="btn1">
        <el-form :model="form" label-width="60px">
          <!-- 第一层 -->
          <el-row>
            <el-col :span="5">
              <el-form-item label="学科" prop="subject">
                <el-select v-model="form.subject" placeholder="请选择学科">
                  <el-option value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="阶段" prop="step">
                <el-select v-model="form.step" placeholder="请选择阶段">
                  <el-option value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="企业" prop="enterprise">
                <el-select v-model="form.enterprise" placeholder="请选择企业">
                  <el-option value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="题型">
                <el-select v-model="form.type" placeholder="请选择题型">
                  <el-option value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4"></el-col>
          </el-row>
          <!-- 第二层 -->
          <el-row>
            <el-col :span="5">
              <el-form-item label="难度" prop="difficulty">
                <el-select v-model="form.difficulty" placeholder="请选择难度">
                  <el-option value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="作者" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <!--  <el-form-item prop="create_date" label="日期">
                <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>-->
              <el-col :span="5">
                <el-form-item prop="create_date" label="日期">
                  <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status">
                  <el-option value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4"></el-col>
          </el-row>
          <!-- 第三层 -->
          <el-row>
            <el-col :span="10">
              <el-form-item prop="title" label="标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button @click="reset">清除</el-button>
                <el-button type="primary" @click="add">+新增试题</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  // 定义方法
  data() {
    return {
      form: {
        // (学科id)  类型: int
        subject: "",
        // (题目阶段)  类型: string	题目阶段:1(初级),2(中级),3(高级)
        step: "",
        // (标题名称): 类型: string	标题名称
        title: "",
        // (企业id): 类型: int	企业id
        enterprise: "",
        // (题目类型): 类型: int	题目类型:1(单选),2(多选),3(简答)
        type: "",
        // (题目难度): 类型: int	题目难度: 1(简单),2(一般),3(困难)
        difficulty: "",
        // (作者): 类型: string	作者
        username: "",
        // (状态): 类型: int	状态:0(禁用),1(启用)
        status: "",
        // (创建日期): 类型: string	创建日期
        create_date: "",
        // (页码): 类型: string	页码 默认为1
        page: "",
        // (页尺寸): 类型: string	页尺寸 默认为10
        limit: "",
      },
    };
  },
  // 统一管理方法
  methods: {
    // 搜索
    search() {},
    // 清空
    reset() {},
    // 新增
    add() {},
  },
};
</script>

<style lang="less">
.btn {
  .el-header {
    height: 228px !important;
    margin: 10px 12px;
    padding: 30px !important;
    // padding: 30px 0;
    background-color: #fff;
    color: #333;
  }
  .el-main {
    height: 100%;
    margin: 10px 12px;
    // padding: 30px 0;
    color: #333;
    background-color: #fff;
  }
}
</style>