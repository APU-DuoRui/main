<template>
  <el-dialog :visible.sync="isShow" fullscreen width="100px">
    <!-- 判断当前模态框的标题是不是 被点击新增题库测试 或者 编辑题库测试  -->
    <div slot="title" class="title">{{mode=="add"?"新增题库测试":"编辑题库测试"}}</div>
    <el-form :model="form" ref="form" label-width="100px">
      <!-- 学科 -->
      <el-form-item label="学科" prop="subject">
        <el-select v-model="form.subject">
          <el-option
            v-for="(item,index) in SubjectList"
            :key="index"
            :label="item.short_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 阶段 -->
      <el-form-item label="阶段" prop="step">
        <el-select v-model="form.step">
          <el-option v-for="(value,key,index) in stepObj" :key="index" :label="value" :value="+key"></el-option>
        </el-select>
      </el-form-item>
      <!-- 企业 -->
      <el-form-item label="企业" prop="enterprise">
        <el-select v-model="form.enterprise">
          <el-option
            v-for="(item,index) in enterprise"
            :key="index"
            :label="item.short_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 城市 -->
      <el-form-item label="城市" prop="city">
        <el-cascader v-model="form.city" :options="options" :props="{value:'label'}"></el-cascader>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item label="题型" prop="type">
        <el-radio
          v-model="form.type"
          v-for="(value,key,index) in typeObj"
          :key="index"
          :label="+key"
        >{{value}}</el-radio>
      </el-form-item>
      <!-- 难度 -->
      <el-form-item label="难度" prop="difficulty">
        <el-radio
          v-model="form.difficulty"
          v-for="(value,key,index) in diffObj"
          :key="index"
          :label="+key"
        >{{value}}</el-radio>
      </el-form-item>
      <hr />
      <!-- 试题标题 -->
      <el-form-item label="试题标题" class="setTop">
        <!-- 富文本有二个东西
          v-model="双向绑定"
          @change="当输入内容改变时执行"
        -->
        <quillEditor v-model="form.title" @change="editorChange"></quillEditor>
      </el-form-item>
      <!-- 单选 -->
      <el-form-item :label="typeObj[form.type]" :prop="typeAnObj[form.type]">
        <!-- 子组件触发父组件  @子组件方法名 ="父组件方法" -->
        <!-- 触发 （子组件触发） this.$emit("子组件方法名",参数) -->
        <!-- <allSelect :form="form" @validateOther="validateOther"></allSelect> -->
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="affirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 富文本 的模块
import { quillEditor } from "vue-quill-editor";
// 富文本的css样式
import "quill/dist/quill.core.css";
// 富文本的css样式
import "quill/dist/quill.snow.css";
// 富文本的css样式
import "quill/dist/quill.bubble.css";

// 导入 级联模块
import { regionData } from "element-china-area-data";

// 导入 接口  新增接口 / 编辑接口
import { editTopic } from "@/port/QuestionAPP/app.js";
export default {
  components: {
    // 定义富文本
    quillEditor,
  },
  // 通过 props  接收 参数父组件
  props: [
    "tableData",
    "SubjectList",
    "stepObj",
    "typeObj",
    "diffObj",
    "enterprise",
  ],
  // 添加一个监听器事件
  watch: {
    isShow(value) {
      // 判断value(当前的值) 是不是等于false 如果等于false 会执行下面的条件
      if (value == false) {
        // 清除form的表单的数据
        this.form = {
          //  3.2表单
          form: {
            // 学科
            subject: "",
            // 阶段
            step: "",
            // 企业
            enterprise: "",
            // 题型
            type: "",
            // 难度
            difficulty: "",
            // 作者
            username: "",
            // 状态
            status: "",
            // 日期
            create_date: "",
            // 标题
            title: "",
            // 单选题答案	是	string
            single_select_answer: "",
            // 多选题答案	是	array
            multiple_select_answer: "",
            // 简答题答案	是	string
            short_answer: "",
            // 解析视频地址	是	string
            video: "",
            // 答案解析	是	string
            answer_analyze: "",
            // 答案备注	是	string
            remark: "",
            // 选项，介绍，图片介绍	是	array
            select_options: "",
          },
        };

        // 在清除上一个数据
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    },
  },
  // 定义方法
  data() {
    return {
      isShow: false,
      // 3.1
      //  级联模块
      options: regionData,
      //  3.2表单
      form: {
        // 学科
        subject: "",
        // 阶段
        step: "",
        // 企业
        enterprise: "",
        // 城市
        city: [],
        // 题型
        type: "",
        // 难度
        difficulty: "",
        // 作者
        username: "",
        // 状态
        status: "",
        // 日期
        create_date: "",
        // 标题
        title: "",
      },
      // 绑定通过子(组件)  mode
      mode: "add",
      // 选向 (单选题答案/多选题答案/简答题答案)
      typeAnObj: {
        1: "single_select_answer",
        2: "multiple_select_answer",
        3: "short_answer",
      },
    };
  },
  // 统一管理方法
  methods: {
    // 点击确认(发送axios)
    affirm() {
      // 从父组件调用 refs 的validate
      this.$refs.form.validate((res) => {
        /// 判断当前是不是新增
        if (res) {
          if (this.mode == "add") {
            // 如果编辑则这个条件
            editTopic(this.form).then(() => {
              // 提示用户
              this.$message.success("新增成功");
              // 关闭模态框
              this.isShow = false;
              // 刷新页面(刷新数据) 调用父组件的方法()
              this.$parent.search();
            });
          } else if (this.mode == "compile") {
            //提示用户
            this.$message.success("编辑成功");
            // 关闭没模态框
            this.isShow = false;
            // 刷新页面
            this.$parent.search();
          }
        } else {
          // 判断当前两个条件都失败则这个条件成立
          this.$message.error("验证失败");
        }
      });
    },
    editorChange(msg) {
      console.log(msg);
    },
  },
};
</script>
<style lang="less">
.title {
  height: 60px;
  line-height: 60px;
  color: #fff;
  background: linear-gradient(to right, #00c3ff, #00aaff, #0096ff);
}
.el-dialog__header {
  padding: 0 !important;
}
.el-icon-close:before {
  color: #fff;
}
.dialog-footer {
  text-align: center;
}
.el-dialog__body {
  width: 600px;
  margin: 0 auto;
}
.setTop .el-form-item__content {
  margin-left: 0 !important;
  margin-top: 60px;
}
.el-select {
  width: 100%;
}
.el-cascader .el-input {
  width: 500px;
}
</style>