<template>
  <el-dialog :visible.sync="isShow" width="600px">
    <!-- 头部 -->
    <div class="title" slot="title">{{mode=='add'?'新增学科':'编辑学科'}}</div>
    <el-form :model="form" :rules="ruleForm" ref="form" label-width="100px" class="demo-form">
      <!-- 学科编码 -->
      <el-form-item label="学科编码" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <!-- 活动名称 -->
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="buttones">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="resetForm">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 导入 封装好的api (发送axios网络请求)
import { edit, add } from "@/port/SubjectAPP/app.js";
export default {
  // 添加一个监听器 用于监听当前输入框的内容如果用户添加/编辑 则需要清空文本
  watch: {
    isShow(vlaue) {
      if (vlaue === false) {
        this.form = {
          // 学科编码
          rid: "",
          // 活动名称
          name: "",
          // 学科简称
          short_name: "",
          // 学科简介
          intro: "",
          // 学科备注
          remark: "",
        };
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    },
  },
  // 定义方法
  data() {
    return {
      // 显示 与 隐藏
      isShow: false,
      mode: "add",
      // 表单
      form: {
        // 学科编码
        rid: "",
        // 活动名称
        name: "",
        // 学科简称
        short_name: "",
        // 学科简介
        intro: "",
        // 学科备注
        remark: "",
      },
      // 定义规则
      ruleForm: {
        // 学科编码
        rid: [
          {
            required: true,
            message: "请输入重新学科编码内容",
            trigger: "blur",
          },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        // 活动名称
        name: [
          {
            required: true,
            message: "请输入重新活动名称内容",
            trigger: "blur",
          },
        ],
        // 学科简称
        short_name: [
          {
            required: true,
            message: "请输入重新学科简称内容",
            trigger: "blur",
          },
        ],
        // 学科简介
        intro: [
          {
            required: true,
            message: "请输入重新学科简介内容",
            trigger: "blur",
          },
        ],
        // 学科备注
        remark: [
          {
            required: true,
            message: "请输入重新学科备注内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  // 管理方法
  methods: {
    // 发送axios 请求  (添加数据)
    // 点击触发 axios请求
    resetForm() {
      // 从父组件调用 refs 的validate
      this.$refs.form.validate((res) => {
        // 判断当前是不是当前的添加按钮 如果不是则是 编辑按钮
        if (res) {
          if (this.mode == "add") {
            add(this.form).then(() => {
              // 如果是编辑则走这个条件
              this.$message.success("编辑成功");
              // 编辑则关闭模态框(隐藏)
              this.isShow = false;
              // 刷新数据
              this.$parent.inquire();
            });
          } else if (this.mode == "edit") {
            edit(this.form).then(() => {
              // 上面的条件不成立 则走了这个条件 (添加)
              this.$message.success("添加成功");
              // 添加完成则隐藏当前的模态框
              this.isShow = false;
              // 子组件调用父组件的(inquire方法) 刷新数据
              this.$parent.inquire();
            });
          }
        } else {
          // 判断两个是不是处与编辑还是处与新增
          this.$message.error("验证失败");
        }
      });
    },
  },
};
</script>

<style lang="less">
.title {
  text-align: center;
  height: 60px;
  line-height: 60px;
  background: linear-gradient(to right, #0bacfa, #05bafa, #109dfa);
}
.el-dialog__header {
  padding: 0 !important;
}
.buttones {
  margin-left: 20%;
}
</style>