<template>
  <div class="btn">
    <el-container>
      <!-- 搜索表单 -->
      <el-header>
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
          <!-- 企业编号 -->
          <el-form-item label="企业编号" prop="eid">
            <el-input v-model="form.eid"></el-input>
          </el-form-item>
          <!-- 企业名称 -->
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- 创建者 -->
          <el-form-item label="创建者" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!-- 操作按钮 -->
          <!-- 查询</ -->
          <el-form-item>
            <el-button type="primary" @click="inquire">查询</el-button>
          </el-form-item>
          <!-- 清除</ -->
          <el-form-item>
            <el-button @click="clear">清除</el-button>
          </el-form-item>
          <!-- +新增企业 -->
          <el-form-item>
            <el-button @click="add" type="primary">+新增企业</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <!-- 企业列表数据 -->
      <el-main>
        <!-- <template> -->
        <!-- :data 通过双向绑定 来传送数据 -->
        <el-table :data="tableData">
          <!-- 序号 -->
          <el-table-column label="序号" width="100" style="padding-left:50px">
            <!-- 使用插值表达式 v-slot -->
            <!-- 判断服务器返回的数据如果有5条(内容) 则显示 5条内容 因为这里使用了自定义$index可以监听服务器的数据 -->
            <template v-slot="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <!-- 企业编号 -->
          <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
          <!-- 企业名称 -->
          <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
          <!-- 创建者 -->
          <el-table-column prop="username" label="创建者" width="180"></el-table-column>
          <!-- 创建日期 -->
          <el-table-column prop="create_time" label="创建日期"></el-table-column>
          <!-- 状态 -->
          <el-table-column label="状态" prop="status">
            <!-- 使用插值表达式 -->
            <template v-slot="scope">
              <!-- 判断当前服务器返回是数据(status) 等于1 (是启用)   不等于1则是禁用-->
              <span :class="{red:scope.row.status==1}">{{scope.row.status==0?"禁用":"启用"}}</span>
            </template>
          </el-table-column>
          <!--操作 -->
          <el-table-column label="操作">
            <template v-slot="scope">
              <!-- 注册一个点击事件 () -->
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <!-- 判断当前是不是 是启用  如果服务器返回的数据(status状态)如果等于1则 禁用 不等于1 则启用 -->
              <el-button type="text" @click="enable(scope.row.id)">
                <!-- 跟上面条件发反过来 -->
                {{scope.row.status =='1'?'禁用':'启用'}}
              </el-button>
              <!-- 注册一个点击事件 () -->
              <el-button type="text" @click="remove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[1,10, 20, 30, 40]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
    <!-- 引入 字组件 -->
    <enterprise ref="enterprise"></enterprise>
  </div>
</template>

<script>
// 导入封装好是axios 请求
import {
  enterpriselist,
  enterprisestatus,
  enterpriseremove,
} from "@/port/CompaniesAPP/app.js";
// 导入字组件 enterprise 企业的(模态框)
import enterprise from "@/components/CompaniesList/enterprise.vue";
export default {
  // 1.将字组件(挂在vue中)
  components: {
    enterprise,
  },
  // 2.用户一进去页面默认发送axios请求 企业列表的数据
  // 创建一个方法   created
  created() {
    // 2.1 调用的封装的axios请求(获取企业列表的数据)
    // 将服务器返回的数据赋值给 数组(tableData)
    // 现在可以直接调用一个函数
    this.getData();
  },
  // (1)定义方法
  data() {
    return {
      // 1.表单
      form: {
        // 企业编号
        eid: "",
        // 企业名称
        name: "",
        // 创建者
        username: "",
        // 状态
        status: "",
      },
      // 2.表格内容
      tableData: [],
      // 3.分页
      pagination: {
        // 当前的页码
        currentPage: 1,
        // 页的数量
        pageSize: 10,
        // 数据总条数
        total: 1,
      },
    };
  },
  // (2) 管理方法
  methods: {
    // 1. 封装一个可以替换  enterpriselist这个请求
    getData() {
      // 1.1 获取form 表单的数据
      // 1.2 声明一个变量来存储form的数据
      let sum = {
        ...this.form,
        // 1.3当前的页码
        page: this.pagination.currentPage,
        // 1.4页的数量
        limit: this.pagination.pageSize,
      };
      // 2.1 调用的封装的axios请求(获取企业列表的数据)
      enterpriselist(sum).then((res) => {
        // 2.2将服务器返回的数据赋值给 数组(tableData)
        this.tableData = res.data.data.items;
        // 2.3将服务器返回的页码赋值给 页面
        //this.pagination.total = res.data.pagination.total;
        // console.log("企业列表", res);
      });
    },
    // 3.搜索 企业列表的数据
    inquire() {
      // 3.1 查找 内容返回的数据 必须要显示第一个页
      this.pagination.currentPage = 1;
      // 3.2 这里可以直接调用一个函数(封装好的axios请求)
      this.getData();
    },
    // 4. 清空搜索框
    clear() {
      // 4,1 这里可以直接使用  resetFields(可以验证属性的字段名  rules因为上面通过prop绑定 表单 可以使用resetFields)
      this.$refs.form.resetFields();
      // 4.2刷新数据 可以重新发送axios请求
      this.getData();
    },

    // 5. 分页面插件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 6. 添加列表(数据)
    add() {
      // 激活模态框的显示
      this.$refs.enterprise.isShow = true;
      console.log("add");
    },

    // 7. 编辑
    edit(row) {
      this.$refs.enterprise.isShow = true;
      this.$refs.enterprise.form = JSON.parse(JSON.stringify(row));
      this.$refs.enterprise.mode = "edit";
      console.log("edit");
    },

    // 8.点击启用(触发axios请求)
    enable(id) {
      enterprisestatus({ id: id }).then(() => {
        // 如果成功就提示用户
        this.$message.success("设置状态成功");
        // 刷新页面
        this.inquire();
      });
    },

    // 9.删除数据
    remove(id) {
      enterpriseremove({ id: id }).then(() => {
        this.$message.success("删除成功");
        // 刷新页面的数据 可以调用
        this.inquire();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  height: 100%;
  .el-header {
    height: 100px !important;
    background-color: #fefff9;
    color: #333;
    margin: 10px 12px;
    padding: 30px 0 !important;
    .el-form-item {
      margin-left: 20px;
      color: #8e8f8f;
      .el-input {
        width: 100px;
        padding: 0 !important;
      }
    }
  }
  // 表格的左边 需要向左偏移20
  /* .el-table th > .cell {
    padding-left: 20px !important;
  } */
  .el-table .cell {
    margin-left: 10px;
  }
  // 企业列表的内容
  .el-main {
    height: 100%;
    color: #333;
    padding: 5px 12px !important;
  }
}
// 分插插件的样式
.block {
  text-align: center;
  padding: 15px 0;
}

.red {
  color: red;
}
</style>