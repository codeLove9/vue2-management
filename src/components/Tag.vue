<template>
  <div>
    <div class="tag-group">
      <el-tag v-for="(item, index) in tags" :key="item.path" :effect="$route.path === item.path ? 'dark' : 'plain'" :closable="item.path !== '/'" disable-transitions @click="$router.push(item.path)" @close="closeHandler(item, index)" size="small">
        {{ item.label }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.breadCrumb
    })
  },
  methods: {
    ...mapMutations(['closeTag']),
    closeHandler(val, index) {
      this.closeTag(val)
      const length = this.tags.length
      // 删除之后的跳转逻辑
      if (val.path === this.$route.path) {
        if (index == length) {
          this.$router.push(this.tags[index - 1].path)
        } else {
          this.$router.push(this.tags[index].path)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 0 20px 40px 0;
  cursor: pointer;
}
</style>
