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
      <!--      <el-pagination-->
      <!--          background-->
      <!--          layout="prev, pager, next"-->
      <!--          @current-change="handleCurrentChange" :current-page="currentPage"-->
      <!--          :total="total">-->
      <!--      </el-pagination>-->

      <el-divider content-position="left">添加类别</el-divider>

      <el-form :inline="true" :model="category" class="demo-form-inline">
        <el-form-item label="类别">
          <el-input v-model="category.name" placeholder="类别"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCategory">添加</el-button>
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
                total: 0,
                currentPage: 1,
                pageSize: 10,
                category: {
                    id: '',
                    name: ''
                }
            }
        },
        methods: {
            addCategory() {

                this.$api.addCategory(this.category).then(response => {
                    console.log(response);
                    this.getAllCategory();
                }).catch(error => {
                    console.log(error);
                });
            },
            getAllCategory() {
                this.$api.getAllCategory().then(res => {
                    this.tableData = res.data;
                }).catch(err => {
                    console.log(err);
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