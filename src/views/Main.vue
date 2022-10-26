<template>
  <el-container>
    <el-aside width="auto">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
export default {
  components: {
    Aside,
    Header
  }
}
</script>

<style scoped>
  .el-header {
    padding: 0;
  }
</style>
