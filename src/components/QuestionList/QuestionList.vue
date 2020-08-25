<template>
  <div class="btn">
    <el-container>
      <!-- 头部模块 -->
      <el-header>
        <!-- 第一层 -->
        <el-form :model="form" ref="form" class="demo-form-inline" label-width="60px">
          <el-row>
            <!-- 学科 -->
            <el-col :span="5">
              <el-form-item label="学科" prop="subject">
                <el-select v-model="form.subject" placeholder="请选择学科">
                  <!-- 遍历从服务器返回的数据 将需要的数据直接通过点语法点出来就可以使用-->
                  <el-option
                    v-for="(item,index) in SubjectList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 阶段 -->
            <el-col :span="5">
              <el-form-item label="阶段" prop="step">
                <el-select v-model="form.step" placeholder="请选择阶段">
                  <!-- 
                    自定义 的数据  遍历自定义的数据 :key="index" 
                    是(index)从0开始  :lanel="value"是当前选中的值 
                    对象的 1 不能通过使用 必须转换字符类型 因为骆雷命名 不能使用带有 数字开头  
                  -->
                  <el-option
                    v-for="(value,key,index) in stepObj"
                    :key="index"
                    :label="value"
                    :value="+key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 企业 -->
            <el-col :span="5">
              <el-form-item label="企业" prop="enterprise">
                <el-select v-model="form.enterprise" placeholder="请选择企业">
                  <!-- 遍历从服务器返回的数据 将需要的数据直接通过点语法点出来就可以使用-->
                  <el-option
                    v-for="(item,index) in enterprise"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 题型 -->
            <el-col :span="5">
              <el-form-item label="题型">
                <el-select v-model="form.type" placeholder="请选择题型">
                  <!-- 
                    自定义 的数据  遍历自定义的数据 :key="index" 
                    是(index)从0开始  :lanel="value"是当前选中的值 
                    对象的 1 不能通过使用 必须转换字符类型 因为骆雷命名 不能使用带有 数字开头  
                  -->
                  <el-option
                    v-for="(value,key,index) in typeObj"
                    :key="index"
                    :label="value"
                    :value="+key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4"></el-col>
          </el-row>
          <!-- 第二层 -->
          <el-row>
            <!-- 难度 -->
            <el-col :span="5">
              <el-form-item label="难度" prop="difficulty">
                <el-select v-model="form.difficulty" placeholder="请选择难度">
                  <!-- 
                    自定义 的数据  遍历自定义的数据 :key="index" 
                    是(index)从0开始  :lanel="value"是当前选中的值 
                    对象的 1 不能通过使用 必须转换字符类型 因为骆雷命名 不能使用带有 数字开头  
                  -->
                  <el-option
                    v-for="(value,key,index) in diffObj"
                    :key="index"
                    :label="value"
                    :value="+key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 作者 -->
            <el-col :span="5">
              <el-form-item label="作者" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
            </el-col>
            <!-- 状态 -->
            <el-col :span="5">
              <el-form-item label="状态" prop="status">
                <el-select v-model="form.status">
                  <el-option label="禁用" :value="0"></el-option>
                  <el-option label="启用" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 日期 -->
            <el-col :span="5">
              <el-form-item prop="create_date" label="日期">
                <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4"></el-col>
          </el-row>
          <!-- 第三层 -->
          <el-row>
            <!-- 标题 -->
            <el-col :span="10">
              <el-form-item prop="title" label="标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
            <!-- 操作按钮 -->
            <el-col :span="14">
              <el-form-item label-width="100px">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button @click="reset">清除</el-button>
                <el-button type="primary" @click="add">+新增试题</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <!-- 数据列表 -->
      <!-- 表格 -->
      <el-main>
        <!-- 序号 -->
        <el-table :data="tableData" border>
          <el-table-column label="序号" width="100">
            <!-- 因为服务器没有序号只能通过自定义的序号  (使用插值语法) -->
            <!-- pagination.pageSize(页码) * pagination.currentPage(当前页码) + scope.$index+1(当前的序码) -->
            <template
              v-slot="scope"
            >{{pagination.pageSize*(pagination.currentPage-1)+scope.$index+1}}</template>
          </el-table-column>
          <!-- 题目 -->
          <el-table-column label="题目" width="180">
            <template v-slot="scope">
              <div v-html="scope.row.title"></div>
            </template>
          </el-table-column>
          <!-- 学科.阶段 -->
          <el-table-column label="学科.阶段">
            <template v-slot="scope">
              <div>{{ scope.row.subject_name }}.{{ stepObj[scope.row.step] }}</div>
            </template>
          </el-table-column>
          <!-- 题型 -->
          <el-table-column label="题型">
            <template v-slot="scope">
              <div>{{typeObj[scope.row.type]}}</div>
            </template>
          </el-table-column>
          <!-- 企业 -->
          <el-table-column prop="enterprise_name" label="企业"></el-table-column>
          <!-- 创建者 -->
          <el-table-column prop="username" label="创建者"></el-table-column>
          <!-- 状态 -->
          <el-table-column label="状态">
            <template v-slot="scope">
              <span :class="{red:scope.row.status==0}">{{scope.row.status==1?"启用":"禁用"}}</span>
            </template>
          </el-table-column>
          <!-- 访问量 -->
          <el-table-column prop="reads" label="访问量"></el-table-column>
          <!-- 操作 -->
          <el-table-column prop="address" label="操作">
            <template v-slot="scope">
              <el-button type="text" @click="compile(scope.row)">编辑</el-button>
              <el-button
                type="text"
                @click="state(scope.row.id)"
              >{{scope.row.status=="1"?'禁用' : '启用' }}</el-button>
              <el-button type="text" @click="remove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <!-- size-change:页容量改变
                current-change:页码改变
                current-page:默认选中哪一页
                page-sizes:页容量选项
                page-size:默认页容量  注意：页容量选项中一定要有该项
                layout:是否显示某些功能
          total：总数-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[1, 5, 10, 20, 40]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
    <!-- 将模态框 当标签来使用  -->
    <!-- 通过 父组件传值  props 传值 -->
    <questionapp
      ref="questionapp"
      :tableData="tableData"
      :SubjectList="SubjectList"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :diffObj="diffObj"
      :enterprise="enterprise"
      :mode="add"
    ></questionapp>
  </div>
</template>

<script>
// 导入封装好的axios  题目列表的axios(接口) 导入 编辑/状态/删除的接口
import { questionList, remove, state } from "@/port/QuestionAPP/app.js";
// 导入封装好是axios  学科列表的数据 (接口)
import { listes } from "@/port/SubjectAPP/app.js";

// 导入 模态框 questionapp
import questionapp from "@/components/QuestionList/questionapp.vue";

// 导入 企业列表的接口
import { enterpriselist } from "@/port/CompaniesAPP/app.js";

export default {
  // 1.将 模态框 挂载vue中(注册 questionapp)
  components: {
    questionapp,
  },
  // 2.从用户进来页面 就默认发送axios请求  获取表格的时数据
  created() {
    // 声明一个变量来存储当前的 页码
    let sum = {
      /*  // 页码
      page: 1, */
      // 请求的页码
      limit: 1,
    };
    // 调用axios接口 (学科列表)
    listes(sum).then((res) => {
      this.SubjectList = res.data.data.items;
      console.log("学科列表", res.data.data.items);
    });
    // 获取企业列表的数据
    enterpriselist(sum).then((res) => {
      this.enterprise = res.data.data.items;
      // console.log("学科列表", res.data.data.items);
    });
    // 这里可以封装(函数) 减小代码冗余
    this.getData();
  },

  // 3.定义方法
  data() {
    return {
      // 3.1分页插件
      pagination: {
        // 当前页码
        currentPage: 1, 
        // 页码
        pageSize: 1,
        // 容量
        total: 100,
      },
      // 4.1 声明一个数组
      // (题库列表)
      tableData: [],
      // (学科列表)
      SubjectList: [],
      // 企业列表
      enterprise: [],
      //  4.2表单
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
        // 页码
        page: "",
        // 页尺寸
        limit: "",
      },
      // 5.1  题目/题型/题目难度
      // 题目类型:1(初级),2(中级),3(高级)
      stepObj: {
        1: "初级",
        2: "中级",
        3: "高级",
      },
      // 	题型 1单选 、2多选 、3简答
      typeObj: {
        1: "单选",
        2: "多选",
        3: "简答",
      },
      // 	题目难度 1简单 、2一般 、3困难
      diffObj: {
        1: "简单",
        2: "一般",
        3: "困难",
      },
    };
  },
  methods: {
    // 封装发送axios请求的接口(题目列表/学科列表)
    getData() {
      // 1.页码 需要传送过去
      let ym = {
        // 获取form表单的数据
        ...this.form,
        // 获取页码
        page: this.pagination.currentPage,
        // 获取页的码容量
        limit: this.pagination.pageSize,
      };
      // 调用axios接口 (题目列表)
      // （题库）题目列表
      questionList(ym).then((res) => {
        // this.tableData = res.data.data.items;
        let _sum = res.data.data.items;
        // 可以修改 原数组的数据 (他有个缺点就是遍历不会停止下来)
        _sum.forEach((item) => {
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });
        // 处理好的数据 将数据赋值给 表单
        this.tableData = _sum;
        // 将处理好的页码 赋值给  total(容量)
        this.pagination.total = res.data.data.pagination.total;
        window.console.log("题库列表数据:", res);
      });
    },

    // 搜索
    search() {
      // 搜索的结果必须是第一页
      this.pagination.currentPage = 1;
      // 调用封装好的数据
      this.getData();
    },
    // 清除
    reset() {
      // 清空表单 通过绑定
      //  A:el-form 的 model B:el-form-item 的prop  C: 通过ref  this.$resfs.值 .resetFields()
      this.$refs.form.resetFields();
      // 刷新页面(更新数据)
      this.getData();
    },
    // 新增
    add() {
      // 触发模态框  questionapp
      this.$refs.questionapp.isShow = true;
      // 传当前的字段
      this.$refs.questionapp.mode = "add";
    },

    // 编辑
    compile(row) {
      // 触发模态框 questionapp
      this.$refs.questionapp.isShow = true;
      // 将当前的row数据传给字组件
      this.$refs.questionapp.form = JSON.parse(JSON.stringify(row));
      // 传当前的字段
      this.$refs.questionapp.mode = "compile";
    },

    // 修改当前的状态
    state(id) {
      //调用一个接口
      state({ id: id }).then(() => {
        // 提示用户 修改成功
        this.$message({
          message: "修改成功",
          type: "success",
        });
        // 刷新页面
        this.getData();
      });
    },

    // 删除当前的数据
    remove(id) {
      // 调用封装好的路接口
      remove({ id: id }).then(() => {
        // 提示用户删除成功
        this.$message({
          message: "删除成功",
          type: "success",
        });
        // 刷新页面
        this.getData();
      });
    },

    // 页容量改变
    handleSizeChange(size) {
      // 将服务器返回的数据 赋值给当前的分页
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      // 刷新数据
      this.getData();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      // 刷新页面
      this.getData();
    },
  },
};
</script>

<style lang="less" >
.btn {
  height: 100%;
  .el-header {
    height: 228px !important;
    background-color: #fff;
    color: #333;
    margin: 10px 12px;
    padding: 30px 0 !important;
    .el-form-item {
      margin-left: 20px;
      color: #8e8f8f;
    }
  }
  // 表格的左边 需要向左偏移20
  /* .el-table th > .cell {
    padding-left: 20px !important;
  } */
  /*  .el-table .cell {
    margin-left: 10px;
  } */
  // 企业列表的内容
  .el-main {
    // height: 100%;
    color: #333;
    padding: 5px 12px !important;
  }
  /*  .el-input__inner{
    width: 200px;
  } */
}
// .el-button--primary {
//     margin-left: -80px;
// }
.red {
  color: red;
}
// 分页的样式
.pagination {
  text-align: center;
  padding: 15px 0;
}
</style>