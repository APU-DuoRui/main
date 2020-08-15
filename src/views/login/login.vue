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
              <el-form-item prop="phone">
                <el-input
                  prefix-icon="el-icon-s-custom"
                  class="btn4"
                  v-model="form.phone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <!-- 密码框 -->
              <el-form-item prop="password">
                <el-input
                  prefix-icon="el-icon-unlock"
                  class="btn4"
                  v-model="form.password"
                  placeholder="请输入密码"
                  type="password"
                  show-password
                ></el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item prop="code">
                <el-row :gutter="20">
                  <el-col :span="16">
                    <!-- 输入框 -->
                    <el-input
                      prefix-icon="el-icon-chat-dot-round"
                      class="btn5"
                      v-model="form.code"
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
              <!-- 复选框 -->
              <el-form-item prop="checked">
                <span class="typeface">
                  <el-checkbox v-model="form.checked" class="protocol">
                    <!-- `checked` 为 true 或 false -->
                    <!-- 这里是一个连接可以跳转页面 -->
                    <span>
                      我已阅读并同意
                      <a href="#" style="color:#00aeff">用户协议</a>和
                      <a href="#" style="color:#00aeff">隐私条款</a>
                    </span>
                  </el-checkbox>
                </span>
              </el-form-item>
              <!-- 登录按钮/注册按钮 -->
              <el-form-item>
                <el-button class="box1" type="primary" @click="registe">登录</el-button>
                <br />
                <el-button class="box1" type="primary" @click="canceEvent">立即创建</el-button>
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
    <!-- 第一步 注册应该标签(使用子组件的步骤) -->
    <!-- 调用 子组件的弹框出来 -->
    <!-- 通过绑定 ref可以操作DOM -->
    <!-- 父传子：1：在子组件标签上定义一个ref  ref=值  -->
    <!-- 2：通过ref拿到该子组件的this===this.$refs.ref值 -->
    <register ref="register"></register>
    <!--这个可以让表单重置(resetFields)   this.$refs.ref值.resetFields() -->
  </div>
</template>

<script>
// 第二步 (使用子组件的步骤)
// 将子组件导入到当前的父组件
import register from "@/views/login/register.vue";
import { getregister } from "@/app/register.js";
export default {
  // 挂载到vue中
  components: {
    register,
  },
  data() {
    return {
      // 1.从进页面就默认发送axios网络请求 --验证切换图片
      bol: true,
      // 1.1设置当前(验证码)网络请求的地址
      yimimg: "http://127.0.0.1/heimamm/public/captcha?type=login",
      // 但是需要的注册事件(显示警告/通过验证)
      // (1). Element form表单里面有非口判断
      form: {
        // 1.用户号码
        // phone: "18520409113",
        phone: "",
        // 2.用户密码
        // password: "123456",
        password: "",
        // 3.验证码
        code: "",
        // 4.点击同意
        checked: "",
      },
      // (2). 注册事件(Element)
      loginForm: {
        // 判断当前用户号码是否合法
        phone: [
          { required: true, message: "输入合法的号码", trigger: "blur" },
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
            trigger: "change",
          },
        ],
        // 判断当前的密码是否正确
        password: [
          { required: true, message: "请重新输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6到12个字符串", trigger: "blur" },
        ],
        // 判断当前的验证码是否正确
        code: [
          { required: true, message: "请重新输入验证码" },
          { min: 3, max: 10, message: "长度在6到15个字符串", trigger: "blur" },
        ],
        // 判断有没有勾选当前的复选框
        checked: [
          { required: true, message: "请勾选协议" },
          // 全局验证：调用el-form表单组件methods里面的一个validate方法
          {
            validator: (rule, value, callback) => {
              // 判断当前有没有勾选协议
              if (value == true) {
                // 成功就走这个条件
                callback();
              } else {
                // 失败就走这个条件
                callback(new Error("请勾选协议"));
              }
            },
          },
        ],
      },
    };
  },
  // (4)统一管理方法
  methods: {
    // 1.点击触发axios网络请求
    yim() {
      // 2.修改img的src的路径的图片
      this.yimimg =
        "http://127.0.0.1/heimamm/public/captcha?type=login&wsdgsdg=" +
        Date.now();
    },
    // (4.1)跳转到主页面
    registe() {
      // 1.使用路由跳转在另一个组件
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 2.如果判断成功则走这个
          // 2.1调用封装好的api
          getregister(this.form).then((res) => {
            // 使用了ElementUI的提示框
            console.log(res);
            this.$message.success("恭喜你登录成功");
            // 2.1做服务器匹配的账号和密码/验证码
            this.$router.push("/headlist");
            // 2.2将当前的token存储到本地存储
            localStorage.setItem("token");
          });
        } else {
          // 3.失败就走这个条件
          // 使用了ElementUI的提示框
          this.$message({
            showClose: true,
            message: "登录失败",
            type: "error",
          });
          // 3.1抛出处理好的数据 然后停止执行
          return false;
        }
      });
    },
    // (4.2).注册一个子(组件)传父(组件)事件  第三步(使用子组件的步骤)
    // 父组件 拿子组件 -事件
    canceEvent() {
      // 父组件 调用 子组件
      this.$refs.register.isShow = true;
    },
  },
};
</script>

<style lang='less'>
@import "~@/assets/css/login.css";
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
    .btn4,
    .btn5 {
      margin-left: -30px;
      width: 90%;
    }
    .yjm {
      width: 110px;
      height: 40px;
      margin-left: -70px;
      margin-top: 2px;
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