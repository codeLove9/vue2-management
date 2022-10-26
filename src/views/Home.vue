<template>
  <div>
    <el-row>
      <el-col :span="8">
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
        <el-card>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16"> 123 </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
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
</style>
