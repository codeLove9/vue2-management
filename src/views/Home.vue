<template>
  <div>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="8" style="padding-right: 10px">
        <!-- 身份卡 -->
        <el-card class="box-card" shadow="hover">
          <div class="user">
            <img src="@/assets/avatar.jpg" alt="" />
            <div class="user-info">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              上次登录时间:
              <span>2022-10-26</span>
            </p>
            <p>
              上次登录地点:
              <span>武汉</span>
            </p>
          </div>
        </el-card>
        <!-- 详情表 -->
        <el-card style="margin-top: 20px; height: 460px">
          <el-table :data="tableData" style="width: 100%">
            <!-- v-for遍历对象, 两个参数： 值，键 -->
            <el-table-column v-for="(value, key) in tableLabel" :key="key" :prop="key" :label="value"> </el-table-column>
            <!-- prop: 内容， label：列头 -->
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16" style="padding-left: 10px">
        <!-- 订单详情 -->
        <div class="num">
          <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="(count, index) in countData" :key="index">
            <i class="icon" :class="`el-icon-${count.icon}`" :style="{ 'background-color': count.color }"></i>
            <div class="detail">
              <p class="price">￥{{ count.value }}</p>
              <p class="desc">{{ count.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 280px">
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <!--  -->
        <div class="graph">
          <!-- 柱状图 -->
          <el-card style="width: 48%; height: 260px">
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <!-- 饼状图 -->
          <el-card style="width: 48%; height: 260px">
            <div ref="echarts3" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '@/api'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
    }
  },
  methods: {
    async getData() {
      const { data: res } = await getData()
      // console.log(res);
      this.tableData = res.data.tableData

      const { orderData, userData, videoData } = res.data
      // 基于准备好的dom，初始化echarts实例
      const myCharts1 = echarts.init(this.$refs.echarts1)
      let echarts1Option = {}
      // 处理数据xAxis
      const xAxis = Object.values(orderData.date)
      const legend = Object.keys(orderData.data[0])
      // console.log(legend)
      echarts1Option.xAxis = { data: xAxis }
      echarts1Option.yAxis = {}
      echarts1Option.legend = {
        data: legend
      }
      // console.log(orderData.data);
      echarts1Option.series = []
      legend.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      echarts1Option.title = { text: '商品销量统计图' }
      // console.log(echarts1Option);
      // 根据配置显示图表
      myCharts1.setOption(echarts1Option)

      const myCharts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category', // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            type: 'bar',
            data: userData.map(item => item.new)
          },
          {
            name: '活跃用户',
            type: 'bar',
            data: userData.map(item => item.active)
          }
        ]
      }
      myCharts2.setOption(echarts2Option)

      const myCharts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: [
          {
            data: videoData,
            type: 'pie'
          }
        ]
      }
      myCharts3.setOption(echarts3Option)
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  text-align: left;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      font-size: 17px;
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #999;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    line-height: 80px;
    text-align: center;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 33%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
