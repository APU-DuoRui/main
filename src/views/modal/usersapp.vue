<template>
  <el-dialog :visible.sync="isShow" width="600px">
    <!-- 头部 -->
    <div class="title" slot="title">{{mode=='add'?'新增用户':'编辑用户'}}</div>
    <el-form :model="form" :rules="ruleForm" ref="form" label-width="100px" class="demo-form">
      <!-- 用户编码 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 活动名称 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 用户简称 -->
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 用户简介 -->
      <el-form-item label="角色" prop="role_id">
        <el-select v-model="form.role_id">
          <el-option v-for="(value,key,index) in roleObj" :key="index" :label="value" :value="+key"></el-option>
        </el-select>
      </el-form-item>
      <!-- 用户备注 -->
      <el-form-item label="状态" prop="status">
        <el-input v-model="form.status"></el-input>
      </el-form-item>
      <!-- 用户备注 -->
      <el-form-item label="用户备注" prop="remark">
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
import { editUserList, addUserList } from "@/networkport/usersApp/UsersList.js";
export default {
  props: ["roleObj"],
  // 添加一个监听器 用于监听当前输入框的内容如果用户添加/编辑 则需要清空文本
  watch: {
    isShow(vlaue) {
      if (vlaue === false) {
        this.form = {
          //string	用户名
          username: "",
          //string	邮箱
          email: "",
          //string	手机号
          phone: "",
          //string	角色 、2 管理员、3 老师、4 学生
          role_id: "",
          //string	1(启用)0(禁用)
          status: "",
          //string	备注
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
        //string	用户名
        username: "",
        //string	邮箱
        email: "",
        //string	手机号
        phone: "",
        //string	角色 、2 管理员、3 老师、4 学生
        role_id: "",
        //string	1(启用)0(禁用)
        status: "",
        //string	备注
        remark: "",
      },
      // 定义规则
      ruleForm: {
        // 邮箱
        email: [
          {
            required: true,
            message: "请输入重新邮箱",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                // 如果正确的邮箱的格式就会走这个条件
                callback();
              } else {
                // 用户输入错误的邮箱就提示用户 重新输入邮箱
                callback(new Error("请确认输入邮箱地址"));
              }
            },
            trigger: "blur",
          },
        ],
        // 手机号
        phone: [
          {
            required: true,
            message: "请输入重新手机号",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              let _rege = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_rege.test(value)) {
                // 如果正确的手机号码 的格式就会走这个条件
                callback();
              } else {
                // 用户输入错误的手机号码 就提示用户 重新输入手机号码
                callback(new Error("请确认输入手机号码"));
              }
            },
            trigger: "blur",
          },
        ],
        // 角色
        intro: [
          {
            required: true,
            message: "请重新选择角色",
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
            addUserList(this.form).then(() => {
              // 如果是编辑则走这个条件
              this.$message.success("编辑成功");
              // 编辑则关闭模态框(隐藏)
              this.isShow = false;
              // 刷新数据
              this.$parent.search();
            });
          } else if (this.mode == "edit") {
            editUserList(this.form).then(() => {
              // 上面的条件不成立 则走了这个条件 (添加)
              this.$message.success("添加成功");
              // 添加完成则隐藏当前的模态框
              this.isShow = false;
              // 子组件调用父组件的(search方法) 刷新数据
              this.$parent.search();
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