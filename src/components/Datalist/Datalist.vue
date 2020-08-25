<template>
  <div class="datum">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <ul class="top">
          <li class="chart-item">
            <div class="circle">{{info.increment_users}}</div>
            <p class="txt">今日新增用户</p>
          </li>
          <li class="chart-item">
            <div class="circle">{{info.total_users}}</div>
            <p class="txt">总用户量</p>
          </li>
          <li class="chart-item">
            <div class="circle">{{info.increment_questions}}</div>
            <p class="txt">新增试题</p>
          </li>
          <li class="chart-item">
            <div class="circle">{{info.total_questions}}</div>
            <p class="txt">总试题量</p>
          </li>
          <li class="chart-item">
            <div class="circle">{{info.total_questions}}</div>
            <p class="txt">总刷题量</p>
          </li>
          <li class="chart-item">
            <div class="circle">{{info.personal_questions}}</div>
            <p class="txt">人均刷题量</p>
          </li>
        </ul>
      </el-header>
      <!-- 内容 -->
      <el-main>
        <!-- 图表  使用 ref="echarts" 父组件传子组件-->
        <div class="echarts" ref="echarts"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// 导入接口(面板数据接口/企业题目数据统计/热门城市题目统计)
import { title, statistics } from "@/port/DataAPP/app.js";
// 导入echarts图表  使用echarts第一步 导入包
import echarts from "echarts";
export default {
  // 面板数据接口
  created() {
    title().then((res) => {
      // 将服务器的返回的数据 赋值给 info
      this.info = res.data.data;
      // console.log("数据:", res);
    });
    // 调用接口 获取 面板数据
    statistics().then((res) => {
      // 将服务器返回的数据 赋值给 chart
      this.chart = res.data.data;
      // console.log(res);
      // 将热门城市的数据赋值的 hotCities
      this.hotCities = res.data.data.map((item) => {
        return item.name;
      });
      // 将图表调用一下
      this.chartList();
    });
  },
  // 定义方法
  data() {
    return {
      // 存当前的面板数据
      info: "",
      // 存当前的企业题目数据统计
      chart: [],
      // 存当前的热门城市的数据
      hotCities: [],
    };
  },
  // 统一管理方法
  methods: {
    // 初始化 图表  第二步 (初始化图表)
    chartList() {
      this.myCharts = echarts.init(this.$refs.echarts);
      // 写图表的(代码)数据
      let option = {
        // 标题
        title: {
          text: "整体数据",
          left: "75px",
          top: "34px",
          textStyle: {
            fontSize: 20,
          },
        },
        // 工具提示
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        // 图例 (图标)
        legend: {
           icon:'circle',
          orient: "vertical",
          right: 240,
          top: 62,
          // 数据(图标的数据)
          data: this.hotCities,
        },
        // 系列
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            // 标记
            labelLine: {
              show: false,
            },
            // 数据
            data: this.chart,
          },
        ],
      };

      // 第三步  将数据返回出来
      this.myCharts.setOption(option);
    },
  },
};
</script>

<style lang="less">
.datum {
  height: 100%;
  .el-header {
    color: #333;
    margin: 12px 10px;
    height: 150px !important;
    padding: 0;
    background-color: #fffffc;
    .top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .chart-item {
        margin-top: 15px;
        .circle {
          width: 99px;
          height: 99px;
          border: 2px solid #0087ff;
          border-radius: 50%;
          line-height: 99px;
          text-align: center;
          font-size: 30px;
          color: #0087ff !important;
        }
        .txt {
          line-height: 30px;
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
  .el-main {
    background-color: #fffffc;
    color: #333;
    margin: 0 10px 12px;
    .echarts {
      width: 100%;
      min-height: 450px;
      margin-left: -40px;
      // 去掉滚动条
      overflow-x: hidden;
      overflow-y: hidden;
    }
  }
}
</style>