<template>
  <div class="header-container">
    <div class="left">
      <el-button icon="el-icon-menu" style="margin-right: 20px" size="mini" @click="changeCollapse"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="tag in tags" :key="tag.path" :to="tag.path">{{ tag.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <img src="@/assets/avatar.jpg" style="height: 40px" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  methods: {
    changeCollapse() {
      this.$store.commit('changeCollapse')
    },
    handleCommand(command) {
      // command === 'logout' ? Cookie.remove('token') : ''
      if(command === 'logout') {
        Cookie.remove('token')
        Cookie.remove('menu')
        this.$router.push('/login')
      }
    }
  },
  computed: {
    ...mapState({
      tags(state) {
        return state.tab.breadCrumb
      }
    })
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
    display: flex;
    align-items: center;
    .text {
      color: #fff;
      font-size: 14px;
      margin: 10px;
    }
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        width: 55px;
        height: 15px;
        color: #666;
        font-weight: normal;
      }
      &:last-child {
        .el-breadcrumb__inner {
          width: 55px;
          height: 15px;
          color: #fff;
        }
      }
    }
  }

  .right {
    img {
      border-radius: 50%;
      margin: 2px 30px 0 0;
      border: 1px solid #fff;
    }
  }
}
</style>
