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
        <Tag></Tag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
import Tag from '@/components/Tag.vue'
export default {
  components: {
    Aside,
    Header,
    Tag
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
}
.el-aside {
  text-align: left;
}

</style>
