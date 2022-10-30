<template>
  <el-form ref="form" class="login-container" :model="form" :rules="rules" :inline="true" label-width="70px">
    <h3>系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from 'js-cookie'
import { getMenu } from '@/api/index'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['setMenu', 'addRouter']),
    login() {
      this.$refs.form.validate(validate => {
        if (validate) {
          getMenu(this.form).then(({ data }) => {
            if (data.code == 20000) {
              console.log(data);
              // 将token存入cookie用于不同页面通信
              const token = data.data.token
              Cookie.set('token', token)
              // 调用store仓库
              this.setMenu(data.data.menu)
              this.addRouter()
              this.$router.push('/home')
            } else {
              this.$message.error(data.data.message)
            }
          })
        }
      })
    }
  },
  mounted() {
    // 回车登录
    var that = this
    document.onkeydown = () => {
      var key = window.event.keyCode
      if (key === 13) {
        that.login()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-button {
    margin-left: 105px;
  }
}
</style>
