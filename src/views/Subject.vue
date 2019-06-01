<template>
  <div>
    <el-card class="box-card">
      <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane v-for="item in categoryList" :name="item.name" ref="a">
        <span slot="label" v-if="item.name === ''">
          全部
        </span>
          <span slot="label" v-else>{{item.name}}</span>
          <el-table
              :data="subjectList"
              border
              style="width: 100%">
            <el-table-column
                type="index"
                width="40">
            </el-table-column>
            <el-table-column
                prop="category"
                label="类别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="title"
                label="题目">
            </el-table-column>
            <el-table-column
                label="查看"
                width="80">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--  -->
          <el-pagination
              background
              :hide-on-single-page="true"
              layout="prev, pager, next"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="pageChange"
              :total="total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
        title="详情"
        :visible.sync="centerDialogVisible"
        center>
      <el-card class="box-card">
        <div slot="header" align="middle">
          <span class="title">{{subject.title}}</span>
        </div>
        <el-collapse-transition>
          <span v-html="subject.answer"></span>
        </el-collapse-transition>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Subject",
        data() {
            return {
                loading: false,
                activeName: "",
                centerDialogVisible: false,
                categoryList: [],
                subjectList: [],
                subject: {},
                total: 5,
                currentPage: 1,
                pageSize: 5,
            }
        },
        methods: {
            getAllCategory() {
                this.$api.getAllCategory().then(res => {
                    this.categoryList = res.data;
                    this.categoryList.splice(0, 0, {id: '', name: ''});
                }).catch(() => {
                    this.$message.error("未知错误");
                });
            },
            getSubject() {
                // console.log(tab.name);
                // console.log(this.activeName);
                let cat = this.activeName === "0" ? "" : this.activeName;
                this.$api.getSubjectByCategory({
                    category: cat,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }).then(res => {
                    this.subjectList = res.data.list;
                    this.total = res.data.total;
                }).catch(() => {
                    this.$message.error("未知错误");
                });
            },
            tabClick() {
                this.currentPage = 1;
                this.getSubject();
            },
            handleClick(row) {
                // console.log(row);
                this.subject = row;
                this.centerDialogVisible = true;
            },
            pageChange(page) {
                // console.log(page);
                this.currentPage = page;
                this.getSubject();
            }

        },
        mounted() {
            this.getAllCategory();
            this.getSubject();
        }
    }
</script>

<style scoped>
  .box-card {
    max-width: 720px;
  }
</style>