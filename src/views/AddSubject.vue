<template>
  <el-card class="box-card">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="题目" prop="title">
        <el-input type="textarea" autosize v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="所属类别" prop="category">
        <el-select v-model="form.category" placeholder="请选择类别">
          <el-option v-for="item in category" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="答案" prop="answer">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="form.answer"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
    export default {
        name: "AddSubject",
        data() {
            return {
                category: [],
                form: {
                    title: '',
                    category: '',
                    answer: ''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入题目', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: '请选择类别', trigger: 'change' }
                    ],
                    answer: [
                        { required: true, message: '请输入答案', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            onSubmit() {
                this.$api.addSubject(this.form).then(res => {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    // 重置表单
                    this.$refs["form"].resetFields();
                }).catch(err => {

                })
            },
            getAllCategory() {
                this.$api.getAllCategory().then(res => {
                    this.category = res.data;
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
.box-card{
  max-width: 720px;
}
</style>