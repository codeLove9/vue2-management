<template>
  <div class="manage" style="height: 90%">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请输入性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker type="date" placeholder="请选择出生日期" v-model="form.birth" style="width: 100%" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-heade">
      <el-button type="primary" @click="handelAdd"> + 新增 </el-button>
      <!-- form搜索区 -->
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchName">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" height="90%" stripe border>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination layout="prev, pager, next" background :total="total" @current-change="handlePage"> </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '@/api/index'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        age: [{ required: true, message: '请输入年龄' }],
        sex: [{ required: true, message: '请选择性别' }],
        birth: [{ required: true, message: '请选择出生日期' }],
        addr: [{ required: true, message: '请输入地址' }]
      },
      tableData: [],
      modelType: 0, // 0表示新增的弹窗， 1表示编辑
      total: 0,
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        name: ''
      }
    }
  },
  methods: {
    // 表单关闭前的回调
    handleClose() {
      this.$confirm('确认关闭？')
        .then(() => {
          this.dialogVisible = false
          this.$refs.form.resetFields()
        })
        .catch(() => {
          throw new Error('faile')
        })
    },
    // 表单确定
    submit() {
      this.$refs.form.validate(valid => {
        // 成功经过校验
        if (valid) {
          // 新增的逻辑
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              this.getList()
            })
            // 编辑逻辑
          } else {
            editUser(this.form).then(() => {
              this.getList()
            })
          }
          // 关闭弹窗
          this.dialogVisible = false
          this.$refs.form.resetFields()
        }
      })
    },
    // 表单取消
    cancel() {
      this.handleClose()
    },
    handleEdit(row) {
      this.modelType = 1
      this.dialogVisible = true
      // 注意要将当前数据进行深拷贝，否则列表会立即随着表单的修改而更改
      this.form = JSON.parse(JSON.stringify(row))
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser(JSON.parse(JSON.stringify({ id: row.id }))).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 新增
    handelAdd() {
      this.modelType = 0
      this.dialogVisible = true
    },
    // 获取列表的数据
    getList() {
      getUser({ params: { ...this.pageData, ...this.userForm } }).then(({ data }) => {
        this.tableData = data.list
        // console.log(data)
        this.total = data.count || 0
      })
    },
    // 切换页码
    handlePage(val) {
      this.pageData.page = val
      this.getList()
    },
    // 搜索名称查询
    searchName() {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.common-table {
  position: relative;
  height: calc(100% - 62px);
  .pagination {
    position: absolute;
    right: 50%;
    bottom: 3%;
    transform: translateX(50%);
  }
}

.manage-heade {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .el-form-item {
    margin: 0;
  }
}
</style>
