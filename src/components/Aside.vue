<template>
  <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <h5>{{ isCollapse ? '后台' : '后台管理系统' }}</h5>
    <!-- 没有子菜单 -->
    <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.path" @click="$store.commit('refreshBreadCrumb', { path: item.path, label: item.label })">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <!-- @click="$store.commit('refreshBreadCrumb', {path: 1, label: 2})" -->
    <el-submenu v-for="item in hasChildren" :key="item.label" index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="menuItem in item.children" :key="menuItem.name">
        <el-menu-item :index="menuItem.path" @click="$store.commit('refreshBreadCrumb', { path: menuItem.path, label: `其他-${menuItem.label}` })">{{ menuItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie"
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    ...mapState({
      // menuData: state => state.tab.menu
      menuData() {
        return JSON.parse(Cookie.get('menu'))|| this.$store.state.tab.menu
      }
    }),
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  border: 0;
  h5 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
  }
}
</style>
