<template>
  <div class="btn">
    <el-container>
      <!-- 学科列表 -->
      <el-header>
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
          <!-- 学科编号 -->
          <el-form-item label="学科编号" prop="rid">
            <el-input v-model="form.rid"></el-input>
          </el-form-item>
          <!-- 学科名称 -->
          <el-form-item label="学科名称" prop="name">
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
          <!-- 查询 -->
          <el-form-item>
            <el-button type="primary" @click="inquire">查询</el-button>
          </el-form-item>
          <!-- 清除 -->
          <el-form-item>
            <el-button @click="remove">清除</el-button>
          </el-form-item>
          <!-- 新增学科 -->
          <el-form-item>
            <el-button type="primary" @click="add">+新增学科</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <!-- 表单 -->
      <el-main>
        <el-table :data="tableData">
          <!-- 序号 -->
          <el-table-column label="序号" width="60px" style="padding-left:50px">
            <template v-slot="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <!-- 学科编号 -->
          <el-table-column prop="rid" label="学科编号" width="180px"></el-table-column>
          <!-- 学科名称 -->
          <el-table-column prop="name" label="学科名称" width="150px"></el-table-column>
          <!-- 简介 -->
          <el-table-column prop="short_name" label="简介" width="150px"></el-table-column>
          <!-- 创建者 -->
          <el-table-column prop="username" label="创建者"></el-table-column>
          <!-- 创建日期 -->
          <el-table-column prop="create_time" label="创建日期"></el-table-column>
          <!-- 状态 -->
          <el-table-column label="状态" prop="status" width="80px">
            <template v-slot="scope">
              <span
                :class="{ red: scope.row.status == 0 }"
              >{{ scope.row.status == 1 ? '启用' : '禁用' }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button
                type="text"
                @click="setStatus(scope.row.id)"
              >{{scope.row.status=='1'?"禁用":"启用"}}</el-button>
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <!-- <span class="demonstration">{{pageSize}}</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[1, 10, 20,30, 40]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
    <!-- 引入 子组件 -->
    <add ref="add"></add>
  </div>
</template>

<script>
// 导入  添加的模态框
import add from "@/components/Subjectlist/add.vue";
// 1.导入 封装好api 获取学科列表
import { listes, remove, status } from "@/port/SubjectAPP/app.js";
export default {
  //挂载在vue中
  components: {
    add,
  },
  data() {
    // (1) 将处理好的数据返回出来
    return {
      // 1.表单
      tableData: [],
      // 2.学科搜索 列表
      form: {
        // 2.1学科编号
        rid: "",
        // 2.2学科名称
        name: "",
        // 2.3创建者
        username: "",
        // 2.4状态
        status: "",
      },
      modeFather: "add",
      // 3.分页
      pagination: {
        // 页码
        currentPage: "",
        // 页容量
        pageSize: 5,
        tolal: "",
      },
    };
  },
  // 3.用户进去页面默认发送axios请求
  created() {
    // 调用封装好的axios请求
    this.getData();
  },
  // (2)统一管理方法
  methods: {
    // 封装一个axios请求
    getData() {
      // 1. 获取当前的form的数据
      let sum = {
        ...this.form,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
      };
      // 2. 获取学科的列表
      listes(sum).then((res) => {
        // 将服务器返回的数据赋值给数组(渲染到页面)
        this.tableData = res.data.data.items;
      });
    },
    // 查询
    inquire() {
      // 查找 内容返回的数据 必须要显示第一个页
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 清除文本
    remove() {
      // 因为这里使用ElementUI的表单 有一个 属性可以验证字段名(rules)
      // 通过 prop绑定表单 则可以使用 resetFields (清空文本)
      this.$refs.form.resetFields();
      // 这里可以刷新一下页面  需要调用封装好的axios 网络请求
      this.getData();
    },
    // 添加
    // 父组件拿子组件的 数据
    add() {
      // 激活 当前子组件的模态框  将isShow 修改为true
      this.$refs.add.isShow = true;
      // 传送当前的按钮的(add)
      this.$refs.add.mode = "add";
    },

    // 编辑
    edit(row) {
      // 激活 当前子组件需要的模态框
      this.$refs.add.isShow = true;
      //
      this.$refs.add.form = JSON.parse(JSON.stringify(row));
      // 传送当前的按钮的(edit)
      this.$refs.add.mode = "edit";
    },

    // 设置状态
    setStatus(id) {
      // 通过点击按钮传过来的id 可以进行操作
      // 调用封装好的api 来发送axios网络请求
      status({ id: id }).then(() => {
        // 提示用户修改状态成功
        this.$message.success("修改状态成功");
        // 刷新页面(刷新完才有当前的修后的数据)需要重新发送请求(数据)
        this.getData();
      });
    },
    // 删除学科列表的数据
    del(id) {
      remove({ id: id }).then(() => {
        // 如果删除就提示用户(删除成功)
        this.$message.success("删除成功");

        // 需要重新刷新页面 (重新发送axios请求)
        this.getData();
      });
    },

    // 分页(1)--(管理发送的条数)
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      // 将服务器返回的数据 赋值给当前的分页
      this.pagination.pageSize = size;
      // 每当数据返回的时 需要手动修改当前数据返回第一页
      this.pagination.currentPage = 1;
    },
    // 分页(2)
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      // 将当前服务器返回的数据 赋值给当前的currentPage 然后渲染到页面上
      this.pagination.currentPage = page;
      // 调用上面封装好的发送axios请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  height: 100%;
  background-color: #e8e9e8;

  .el-header {
    height: 100px !important;
    background-color: #fffffc;
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
}
.el-main {
  height: 100%;
  background-color: #fffffc;
  color: #333;
  margin: 5px 12px;
}
/* .el-table th>.cell {
  padding-left: -10px !important;
} */
.el-table .cell {
  margin-left: 10px !important;
}
.red {
  color: red;
}
// 分页组件
.el-pagination {
  padding: 15px;
  text-align: center;
}
</style>