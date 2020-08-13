<template>
  <div>
    <el-dialog :visible.sync="isShow" :show-close="false" width="600px" class="modal">
      <div class="title" slot="title">注册账号</div>
      <el-form :model="form" ref="form" :rules="loginForm" label-width="80px">
        <!-- 用户头像 -->
        <el-form-item label="用户头像">
          <el-row :gutter="24">
            <el-col :span="22">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" v-if="dialogImageUrl" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 名字 -->
        <el-form-item prop="name" label="名字">
          <el-row :gutter="24">
            <el-col :span="22">
              <el-input prefix-icon="el-icon-medal" v-model="form.name" autocomplete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="mailbox" label="邮箱">
          <el-row :gutter="24">
            <el-col :span="22">
              <el-input prefix-icon="el-icon-message" v-model="form.mailbox" autocomplete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item prop="account" label="手机">
          <el-row :gutter="24">
            <el-col :span="22">
              <el-input prefix-icon="el-icon-s-custom" v-model="form.account" autocomplete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
          <el-row :gutter="24">
            <el-col :span="22">
              <el-input prefix-icon="el-icon-unlock" v-model="form.password" autocomplete="off"></el-input>
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
              <img class="yjm" v-if="bol" @click="yim" :src="yimimg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="auth1" label="验证码">
          <el-row :gutter="24">
            <el-col :span="15">
              <!-- 输入框 -->
              <el-input
                prefix-icon="el-icon-chat-dot-round"
                class="btn5"
                v-model="form.auth1"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button class="auth1">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="put">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // 在上传头像 可以注册一个监听事件
  wath: {
    isShow(newVal) {
      //newVal ：当前的值
      if (newVal == false) {
        this.$refs.form.reseFields();
        this.dialogImageUrl = "";
      }
    },
  },
  data() {
    return {
      // 这个显示的模态框的 显示与隐藏
      isShow: false,
      // 上传头像
      dialogImageUrl: "",
      dialogVisible: false,
      // 页面加载默认触发 axios 网络请求
      bol: true,
      // 将一个基地址放到需要的img(请求的标签)
      yimimg: "http://127.0.0.1/heimamm/public/captcha?type=sendsms",
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
      // 通过绑定loginForm
      loginForm: {
        //名字
        name: [
          { required: true, message: "请输入用户名字", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        //邮箱
        mailbox: [
          { required: true, message: "请重新输入邮箱", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        //手机
        account: [
          { required: true, message: "请新输入电话号码", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "长度在 11 到 11 个字符",
            trigger: "blur",
          },
        ],
        //密码
        password: [
          { required: true, message: "请新输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        // 图形码
        auth: [
          { required: true, message: "请重新输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 3 到 4 个字符", trigger: "blur" },
        ],
        // 验证码
        auth1: [
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
      this.yimimg =
        "http://127.0.0.1/heimamm/public/captcha?type=sendsms&sdgsdgsd" +
        Date.now();
    },
    // 2.上传头像
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 3.注册账号
    put() {
      // 1.使用路由跳转在另一个组件
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 2.如果判断成功则走这个
          // 使用了ElementUI的提示框
          this.$message({
            showClose: true,
            message: "恭喜你注册成功",
            type: "success",
            isShxow: false,
          });
          // 创建完成就隐藏
        } else {
          // 3.失败就走这个条件
          // 使用了ElementUI的提示框
          this.$message({
            showClose: true,
            message: "注册失败",
            type: "error",
          });
          // 3.1抛出处理好的数据 然后停止执行
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less">
// 模态框
.modal {
  margin-top: -70px;
  height: 786px;
}
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
// 图形验证码
.yjm,
.auth1 {
  // 验证码的按钮
  width: 138px;
  height: 41px;
  margin-left: -14px;
}
</style>