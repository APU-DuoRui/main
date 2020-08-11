<template>
  <div class="btn1">
    <el-row :gutter="1">
      <el-col :span="7" :offset="4">
        <div class="grid-content bg-purple btn-margin">
          <div class="btn2">
            <img class="login" src="@/assets/img/logn02.png" alt />
            <span class="font">登录页面</span>
            <span class="frame"></span>
            <span class="font">用户登录</span>
            <el-form ref="form" :model="form" label-width="80px" :rules="loginForm" class="btn3">
              <!-- 输入手机 -->
              <el-form-item>
                <el-input
                  prefix-icon="el-icon-s-custom"
                  class="btn4"
                  v-model="form.account"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <!-- 密码框 -->
                <el-input
                  prefix-icon="el-icon-unlock"
                  class="btn4"
                  v-model="form.password"
                  placeholder="请输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <!-- 验证码 -->
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
                    <img class="yjm" src="@/assets/img/yjm.png" alt />
                  </el-col>
                </el-row>
                <!-- 复选框 -->
                <span class="typeface">
                  <span class="typeface">
                    <el-checkbox v-model="form.checked" class="protocol">
                      <!-- `checked` 为 true 或 false -->
                      <i></i>我已阅读并同意
                      <el-link type="primary">
                        <!-- 这里是一个连接可以跳转页面 -->
                        <span style="font-size:14px;">用户协议</span>
                      </el-link>和
                      <el-link type="primary">
                        <!-- 这里是一个连接可以跳转页面 -->
                        <span style="font-size:14px">隐私条款</span>
                      </el-link>
                    </el-checkbox>
                  </span>
                </span>
                <el-button class="box1" type="primary" @click="register">登录</el-button>
                <br />
                <el-button class="box1" type="primary" @click="onSubmit">立即创建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <!-- 背景图片 -->
      <el-col :span="6" :offset="4">
        <div class="grid-contente btn-margin"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 用户号码
        // account: "180000000000",
        account: "",
        // 用户密码
        // password: "123456",
        password: "",
        // 验证码
        auth: "",
        // 点击同意
        checked: [],
      },
      loginForm: {
        // 判断当前用户号码是否合法
        account: [
          { required: true, message: "输入合法的号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符串", trigger: "blur" },
        ],
        // 判断当前的密码是否正确
        password: [
          { required: true, message: "请重新输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6到12个字符串", trigger: "blur" },
        ],
        // 判断当前的验证码是否正确
        auth: [
          { required: true, message: "请重新输入验证码" },
          { min: 3, max: 10, message: "长度在6到15个字符串", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 跳转到主页面
    register() {
      this.$router.push("/headlist");
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang='less'>
@import "../assets/css/login.css";
.btn2 {
  height: 20px;
  padding-top: 45px;
  .login {
    width: 30px;
    height: 25px;
    margin: -4px 20px;
    padding-left: 35px;
  }
  .font,
  .frame {
    font-weight: 600;
    font-size: 24px;
    margin-right: 13px;
  }
  .frame {
    width: 2px;
    border-left: 2px #e4e5e0 solid;
  }
  .btn3 {
    margin-top: 25px;
    .btn4 {
      margin-left: -30px;
      width: 90%;
    }
    .btn5 {
      width: 90%;
      margin-left: -30px;
    }
    .yjm {
      width: 110px;
      height: 40px;
      margin-left: -70px;
    }
  }
}
.protocol {
  margin-left: -28px;
  .typeface {
    display: flex;
    font-size: 14px;
    line-height: 10px;
  }
}
.box1 {
  width: 100%;
  margin: 5px 0 5px -40px !important;
}
</style>