<template>
  <div>
    <el-dialog :visible.sync="isShow" :show-close="false">
      <div class="title" slot="title">注册账号</div>
      <el-form :model="form" ref="form" label-width="80px">
        <!-- 名字 -->
        <el-form-item prop label="名字" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="mailbox" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.mailbox" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item prop="account" label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item prop="auth" label="图形码">
          <el-row :gutter="20">
            <el-col :span="16">
              <!-- 输入框 -->
              <el-input
                prefix-icon="el-icon-chat-dot-round"
                class="btn5"
                v-model="form.auth"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <!-- 验证码图片 -->
            <el-col :span="8">
              <!-- bol是一进页面就默认 发送axios 如果用户点击当前的图片要切换验证码的图片 修改src路径 -->
              <img class="yjm" v-if="bol" @click="yim" :src="yimimg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="auth1" label="验证码">
          <el-row :gutter="20">
            <el-col :span="16">
              <!-- 输入框 -->
              <el-input
                prefix-icon="el-icon-chat-dot-round"
                class="btn5"
                v-model="form.auth1"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <!-- 验证码图片 -->
            <el-col :span="8">
              <!-- bol是一进页面就默认 发送axios 如果用户点击当前的图片要切换验证码的图片 修改src路径 -->
              <img class="yjm" v-if="bol" @click="yim" :src="yimimg" alt />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      dialogFormVisible: false,
      form: {
        //名字
        name: "",
        //邮箱
        mailbox: "",
        //手机
        account: "",
        //密码
        password: "",
        //图形码
        auth: "",
        //验证码
        auth1: "",
      },
      formLabelWidth: "100px",
    };
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
  padding: 0;
}
.dialog-footer {
  text-align: center;
}
</style>