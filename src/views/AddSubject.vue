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
<!--        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="form.answer"></el-input>-->
        <quill-editor ref="myTextEditor"
                v-model="form.answer"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
                },
                editorOption:{
                    theme: "snow",
                    modules: {
                        toolbar: [
                            ['bold', {'header': 1}, {'header': 2}],
                            [ {'list': 'ordered'}, {'list': 'bullet'}, 'code-block'],
                            ['link', 'image', 'video']
                        ]
                    },
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.addSubject(this.form).then(res => {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            // 重置表单
                            this.$refs[formName].resetFields();
                        }).catch(err => {
                            let data = err.data;
                            if (data.code === 400) {
                                this.$message.error(data.msg);
                            } else {
                                this.$message.error("未知错误");
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            getAllCategory() {
                this.$api.getAllCategory().then(res => {
                    this.category = res.data;
                }).catch(err => {
                    this.$message.error("未知错误");
                });
            },
            //编辑器失去焦点事件
            onEditorBlur(){

            },

            //编辑器获得焦点事件
            onEditorFocus(){

            },

            //编辑器内容改变事件
            onEditorReady(){

            },

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