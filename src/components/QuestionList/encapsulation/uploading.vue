<template>
  <el-upload
    class="avatar-uploader"
    :action="baseUrl + '/question/upload'"
    name="file"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <!-- 判断是不是图片 -->
    <div v-if="type=='img'">
      <img v-if="value" :src="baseUrl+'/'+value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!-- 判断是不是视频 -->
    <div v-else>
      <video v-if="value" :src="baseUrl + '/' + value" class="avatar" controls></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </el-upload>
</template>

<script>
export default {
  // 父组件传子组件(必须要使用 props)
  // value 视频  type 图片
  props: ["value", "type"],
  // 定义方法
  data() {
    return {
      // 给 baseUrl 一个基地址
      baseUrl: process.env.VUE_APP_URL,
    };
  },
  // 统一管理方法
  methods: {
    // 存储当前的数据
    handleAvatarSuccess(res) {
      window.console.log("上传：", res);
      // 通过$emit 子组件拿父组件(的数据) 必须子组件是input触发
      this.$emit("input", res.data.url);
    },
    // 上传的格式
    beforeAvatarUpload(file) {
      if (this.type == "img") {
        // 判断是不是 图片 如果是则走这个条件
        const isJPG = file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        // 如果不等于 jpg格式 就提示用户
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG,PNG 格式!");
        }
        // 如果不等于 图片大小 就提示用户
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        // 将处理好的数据返回出来
        return isJPG && isLt2M;
      } else {
        // 如果上面的条件不成立则 走这个条件 (判断当前是不是视频)
        const isVideo = file.type === "video/mp4" || file.type === "video/ave";
        const isLt100M = file.size / 1024 / 1024 < 100;
        // 如果不等于 mp4,ave格式 就提示用户
        if (!isVideo) {
          this.$message.error("上传头像视频只能是 mp4,ave 格式!");
        }
        // 如果不等于 图片大小 就提示用户
        if (!isLt100M) {
          this.$message.error("上传头像视频大小不能超过 100MB!");
        }
        // 将处理好的数据返回出来
        return isVideo && isLt100M;
      }
    },
  },
};
</script>

<style lang="less">
.avatar-uploader {
  padding: 20px 20px 0px;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>