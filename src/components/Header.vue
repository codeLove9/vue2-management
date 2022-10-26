<template>
  <div class="header-container">
    <div class="left">
      <el-button icon="el-icon-menu" size="mini" @click="changeCollapse"></el-button>
      <span class="text">首页</span>
    </div>
    <div class="right">
      <el-dropdown>
        <img src="@/assets/avatar.jpg" style="height: 40px">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeCollapse() {
      this.$store.commit('changeCollapse')
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  height: 60px;
  padding: 0 20px;

  .left {
    .text {
      color: #fff;
      font-size: 14px;
      margin: 10px;
    }
  }

  .right {
    img {
      border-radius: 50%;
      margin: 2px 30px 0 0;
      border: 1px solid #fff;;
    }
  }
}
</style>
