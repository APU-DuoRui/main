<template>
  <div class="btn">
    <!-- 单选 -->
    <div v-if="form.type==1">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <!--  -->
        <el-radio
          v-model="form.single_select_answer"
          @change="editorChange('single_select_answer')"
          :label="item.label"
        >{{item.label}}</el-radio>
        <!-- 输入框 -->
        <el-input v-model="item.text"></el-input>
        <!-- 上传框 第三步 当标签使用 -->
        <!-- 双向绑定 v-model -->
        <uploading v-model="item.image" type="img"></uploading>
      </div>
    </div>
    <!-- 复选框 -->
    <div v-else-if="form.type==2">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <!--  -->
        <el-checkbox v-model="form.multiple_select_answer" :label="item.label">{{item.label}}</el-checkbox>
        <!-- 输入框 -->
        <el-input v-model="item.text"></el-input>
        <!-- 上传图片框  第三步 当标签使用-->
        <!-- 双向绑定 v-model -->
        <uploading v-model="item.image" type="img"></uploading>
      </div>
    </div>
    <!-- 简答 -->
    <div v-else>
      <el-input type="textares" v-model="form.short_answer" :rows="4"></el-input>
    </div>
  </div>
</template>

<script>
// 导入上传的(图片)/(视频)的组件  (第一步)
import uploading from "@/components/QuestionList/encapsulation/uploading.vue";
export default {
  // 父组件传子组件
  props: ["form"],
  // 将uploading挂载在vue中 (第二步)
  components: {
    uploading,
  },
  // 定义方法
  data() {
    return {};
  },

  // 管理方法
  methods: {
    //调用el-form表单的验证validateField(或者调用父组件一个验证方法)
    editorChange(msg) {
      this.$emit("radio", msg);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 520px;
  .item {
    display: flex;
    line-height: 60px;
    align-items: center;
    margin-left: -35px;
    .el-checkbox:last-of-type {
      margin-right: 30px;
    }
    .avatar-uploader-icon {
      margin-left: 78px;
    }
  }
}
</style>