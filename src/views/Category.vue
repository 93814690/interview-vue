<template>
  <div>
    <el-card class="box-card">
      <el-table
          :data="tableData"
          border
          stripe
      >
        <el-table-column
            type="index"
            width="50"
        >
        </el-table-column>
        <el-table-column
            prop="name"
            label="类别"
        >
        </el-table-column>
        <el-table-column
            label="操作"
        >
          <template slot-scope="scope">
            <el-button disabled @click="handleClick(scope.row)" size="small">编辑</el-button>
            <el-button disabled type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-divider content-position="left">添加类别</el-divider>

      <el-form :inline="true" :model="category" ref="categoryForm" class="demo-form-inline">
        <el-form-item label="类别"
                      prop="name"
                      :rules="[
                      { required: true, message: '请输入类别', trigger: 'blur' }
                      ]"
        >
          <el-input v-model="category.name" placeholder="类别"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCategory('categoryForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>


</template>

<script>
    export default {
        name: "Category",
        data() {
            return {
                tableData: [],
                category: {
                    name: ''
                }
            }
        },
        methods: {
            addCategory(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.addCategory(this.category).then(response => {
                            this.getAllCategory();
                            // 重置表单
                            this.$refs[formName].resetFields();
                        }).catch(error => {
                            let data = error.data;
                            if (data.code === 400) {
                                this.$message.error(data.msg);
                            } else {
                                this.$message.error("未知错误");
                            }
                        });
                    } else {
                        return false;
                    }
                });

            },
            getAllCategory() {
                this.$api.getAllCategory().then(res => {
                    this.tableData = res.data;
                }).catch(err => {
                    this.$message.error("未知错误");
                });
            }
        },
        mounted() {

            this.getAllCategory();
        }
    }
</script>

<style scoped>
  .box-card {
    max-width: 720px;
  }
</style>