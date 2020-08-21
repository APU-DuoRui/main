<template>
  <el-dialog :visible.sync="isShow" :show-close="false" width="600px" class="modal">
    <!-- (1). 把div使用slot设置title  可以变成头部   -->
    <div class="title" slot="title">注册账号</div>
    <!-- a.model:数据绑定 -->
    <!--  b.注册一个 ref 可以操作DOM 进行  :rules绑定验证码的规则 :rules 的值是对象类型  -->
    <el-form :model="form" ref="form" :rules="loginForm" label-width="80px">
      <!-- 用户头像 -->
      <el-form-item prop="avatar" label="头像">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl + '/uploads'"
          name="image"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
        >
          <img v-if="form.avatar" :src="baseUrl + '/'+ form.avatar" alt />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 名字 -->
      <el-form-item prop="username" label="名字">
        <el-row :gutter="24">
          <el-col :span="22">
            <el-input prefix-icon="el-icon-medal" v-model="form.username" autocomplete="off"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email" label="邮箱">
        <el-row :gutter="24">
          <el-col :span="22">
            <el-input prefix-icon="el-icon-message" v-model="form.email" autocomplete="off"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 手机 -->
      <el-form-item prop="phone" label="手机">
        <el-row :gutter="24">
          <el-col :span="22">
            <el-input prefix-icon="el-icon-s-custom" v-model="form.phone" autocomplete="off"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" label="密码">
        <el-row :gutter="24">
          <el-col :span="22">
            <el-input
              prefix-icon="el-icon-unlock"
              show-password
              type="password"
              v-model="form.password"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item prop="auth" label="图形码">
        <el-row :gutter="24">
          <el-col :span="15">
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
            <img class="yjm" v-if="bol" @click="yjm" :src="yimimg" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="rcode" label="验证码">
        <el-row :gutter="24">
          <el-col :span="15">
            <!-- 输入框 -->
            <el-input
              prefix-icon="el-icon-chat-dot-round"
              class="btn5"
              v-model="form.rcode"
              placeholder="请输入验证码"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <!-- 这里可以给一个(disabled="toTime")禁止按钮  点击-->
            <el-button class="rcode" @click="rcode" :disabled="toTime<5">
              获取用户验证码
              <span v-if="toTime!=5">({{toTime+1}}秒)</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="put">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 第二步 导入对应的API替换在本页面发送axios网络   导入接口注册账号的接口
import { getPhoneColdeApi, registerModule } from "@/port/LoginAPP/app.js";
export default {
  // 在上传头像 可以注册一个监听事件
  watch: {
    isShow(newVal) {
      //newVal ：当前的值
      if (newVal == false) {
        // 清除表单
        this.$refs.form.resetFields();
        // 将图片置空
        this.imageUrl = "";
      }
    },
  },
  data() {
    return {
      // 这个显示的模态框的 显示与隐藏
      isShow: false,
      // 上传头像
      baseUrl: process.env.VUE_APP_URL,
      // dialogVisible: false,
      // 页面加载默认触发 axios 网络请求
      bol: true,
      // 将一个基地址放到需要的img(请求的标签)
      // yimimg: "http://127.0.0.1/heimamm/public/captcha?type=sendsms",
      // 图形验证码
      yimimg: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 点击发送获取用户的验证码的倒计时
      toTime: 5,
      form: {
        // 头像
        avatar: "",
        //名字
        username: "",
        //邮箱
        email: "",
        //手机
        phone: "",
        //密码
        password: "",
        //图形码
        auth: "",
        //验证码
        rcode: "",
      },
      // d.通过绑定loginForm
      loginForm: {
        // 头像
        avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
        // 名字
        username: [
          { required: true, message: "请输入用户名字", trigger: "blur" },
        ],
        // 邮箱
        email: [
          { required: true, message: "请重新输入邮箱", trigger: "blur" },
          // 定义邮箱 的格式
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
            trigger: "change",
          },
        ],
        //手机
        phone: [
          { required: true, message: "请新输入电话号码", trigger: "blur" },
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
        //密码
        password: [
          { required: true, message: "请新输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        // 图形码
        auth: [
          { required: true, message: "请重新输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 3 到 4 个字符", trigger: "blur" },
        ],
        // 验证码
        rcode: [
          { required: true, message: "请重新输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 3 到 4 个字符", trigger: "blur" },
        ],
      },
    };
  },
  // 统一管理方法
  methods: {
    // 1.1点击触发axios网络请求
    yim() {
      // 1.2.修改当前的img的src
      /*  this.yimimg =
        "http://127.0.0.1/heimamm/public/captcha?type=sendsms&sdgsdgsd" +
        Date.now(); */
      this.yimimg = process.env.VUE_APP_URL + "sendsms&sdgsdgsd" + Date.now();
    },
    // 2.上传头像
    uploadSuccess(res) {
      // 2.1上传 完成头像 由于该组件内部没有执行表单验证码 ，所以需要手动触发
      this.form.avatar = res.data.file_path;
      // 2.2 父组件调用子组件的方法
      this.$refs.form.validateField(["avatar"]);
    },
    // 2.3.判断用户上传的是不是符合 服务器的需求
    beforeUpload(file) {
      // 判断当前用户是不是上传 jpeg  png  gif
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      // 目前的文件大小必须是2m 或者 小于 <2m
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传的头像只能是 JPG,PNG,GIF的格式");
      }
      if (!isLt2M) {
        this.$message.error("上传的头像的大小不能超过  2MB");
      }
      // 将处理好的数据返回出去
      return isJPG && isLt2M;
    },

    // 3.注册账号
    put() {
      // 1.使用路由跳转在另一个组件
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 2.如果判断成功则走这个
          // 2.1调用封装好的接口
          registerModule(this.form).then((res) => {
            // 使用了ElementUI的提示框
            this.$message.success("注册成功");
            this.isShow = false;
            console.log(res);
          });
          // 创建完成就隐藏
        } else {
          // 3.失败就走这个条件
          // 使用了ElementUI的提示框
          this.$message.error("验证失败");
          // 3.1抛出处理好的数据 然后停止执行
          // return false;
        }
      });
    },

    // 4.点击验证码 就会从服务器返回的一个新的验证码图片
    yjm() {
      // 基地址
      /*   this.yimimg =
        "http://127.0.0.1/heimamm/public/captcha?type=sendsms$sdgsdgsd" +
        Date.now(); */
      // 封装好的地址
      this.yimimg =
        process.env.VUE_APP_URL +
        "/captcha?type=sendsms&sahgsdhg=" +
        Date.now();
    },
    // 5.点击获取用户的验证码
    rcode() {
      // 5.1声明一个空值
      let sum = 0;
      // 5.2 需要调用el-form 里面的validateField方法
      // 手机(phone)    图形验证码 (auth)
      this.$refs.form.validateField(["phone", "auth"], (errorMessage) => {
        //
        window.console.log(errorMessage);
        // 5.3 判断当前的没有没输入 手机号码
        if (errorMessage == "") {
          sum++;
        }
      });
      // (1)判断当前有没有输入图形验证码
      if (sum == 2) {
        // 1这里是防止用户点击过多
        // 防止出现bug 就--
        this.toTime--;
        // 2声明一个变量 因为 开了一个定时器 等定时器走完就后要停止定时器
        let Time = setInterval(() => {
          // 3 开始倒数
          this.toTime--;
          // 4判断当前的定时器是否走完 如果走完了就停止定时器
          if (this.toTime == 0) {
            // 5停止定时器
            clearInterval(Time);
            this.toTime = 5;
          }
        }, 1000);

        // 第三步调用对应的 封装好的 axios网络请求(使用api)
        getPhoneColdeApi({
          phone: this.form.phone,
          code: this.form.auth,
        })
          .then((res) => {
            // 6.返回的数据
            // 7.提示用户返回  验证码超成功发送到用户
            // this.$message.success(res.data.data.captcha + " ");
            this.$message.success(res.data.data.captcha + "");
            window.console.log(res);
          })
          // 8.抛出异常
          .catch((error) => {
            window.console.log(error);
          });
      } else {
        // 提示用户 要用户接收验证码
        this.$message.error("验证码无效，请重新输入验证码");
      }
    },
  },
};
</script>

<style lang="less">
// 模态框
.modal {
  margin-top: -70px;
  // overflow-x: hidden;
  max-height: 1200px;
}

.title {
  text-align: center;
  height: 60px;
  line-height: 60px;
  background: linear-gradient(to right, #0bacfa, #05bafa, #109dfa);
}
.avatar-uploader {
  text-align: center;
}
.el-dialog__header {
  padding: 0;
}
.dialog-footer {
  text-align: center;
}
// 图形验证码
.yjm,
.rcode {
  // 验证码的按钮
  width: 138px;
  height: 41px;
  margin-left: -14px;
}
</style>