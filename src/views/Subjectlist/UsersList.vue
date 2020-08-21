<template>
  <div class="btn">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role_id">
            <el-select v-model="form.role_id" placeholder="请选择角色">
              <el-option
                v-for="(value,key,index) in roleObj"
                :key="index"
                :label="value"
                value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">清除</el-button>
            <el-button type="primary" @click="add">+新增用户</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <!-- 表格 -->
      <el-main>
        <template>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="序号" width="120">
              <template v-slot="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="role" label="备注"></el-table-column>
            <el-table-column prop="remark" label="状态">
              <template v-slot="scope">
                <span :class="{red:scope.row.status==0}">{{scope.row.status==1?"启用":"禁用"}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template v-slot="scope">
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button
                  type="text"
                  @click="setStatus(scope.row.id)"
                >{{scope.row.sraus=='1'?"禁用":'禁用'}}</el-button>
                <el-button type="text" @click="remove(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[1, 10, 20, 30, 40]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
    <!-- 第三步   当前标签使用  父组件传子组件 -->
    <usersapp ref="usersapp" :roleObj="roleObj"></usersapp>
  </div>
</template>

<script>
// 导入 用户接口  setUserListStatus, delUserList,
import {
  getUserListList,
  delUserList,
  setUserListStatus,
} from "@/networkport/usersApp/UsersList.js";
// 导入当前的模态框 第一步
import usersapp from "@/views/modal/usersapp.vue";
export default {
  // 第二步定义在vue中
  components: {
    usersapp,
  },
  created() {
    this.getData();
  },
  data() {
    return {
      // 角色
      roleObj: {
        1: "超级管理员",
        2: "管理员",
        3: "老师",
        4: "学生",
      },
      // 表单
      form: {
        username: "",
        email: "",
        role_id: "",
      },
      // 表格 声明一个空数组 来存储服务器返回的数据
      tableData: [],
      // 分页
      pagination: {
        currentPage: 1, //页码
        pageSize: 5, //页容量(一页的总数)
        total: 100,
      },
    };
  },
  methods: {
    // 封装函数(接口)
    getData() {
      // 声明一个变量来存储当前的form
      let sum = {
        ...this.form,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
      };
      // 获取用户列表
      getUserListList(sum).then((res) => {
        this.tableData = res.data.data.items;
        // window.console.log("用户列表：", res);
        this.pagination.total = res.data.data.pagination.total;
      });
    },
    // 搜索
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },

    // 清空文本
    reset() {
      // this.$refs.form.resetFields();
      this.$refs.form.resetFields();
      this.search();
    },

    // 增加
    add() {
      // 触发模态框
      this.$refs.usersapp.isShow = true;
    },

    // 编辑
    edit(row) {
      // 触发模态框
      this.$refs.usersapp.isShow = true;
      // 转换类型
      this.$refs.usersapp.form = JSON.parse(JSON.stringify(row));
      // 传送当前的按钮的(edit)
      this.$refs.usersapp.mode = "edit";
    },

    // 状态
    setStatus(id) {
      setUserListStatus({ id: id }).then(() => {
        this.$message.success("修改成功");
        // 刷新数据
        this.search();
      });
    },

    // 删除
    remove(id) {
      delUserList({ id: id }).then(() => {
        this.$message.success("删除成功");
        // 刷新数据
        this.search();
      });
    },
    // 页容量改变
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.search();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
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
    padding: 30px 0 !important;
    margin: 10px 12px;
    .el-form-item {
      margin-left: 20px;
      .el-input {
        width: 100px;
        padding: 0 !important;
      }
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
  }

  .el-main {
    padding: 0 12px;
    background-color: #e8e9e8;
    color: #333;
  }
}
.red {
  color: red;
}
//分页
.pagination {
  text-align: center;
  padding: 15px 0;
}
</style>