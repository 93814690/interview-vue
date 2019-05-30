<template>

  <el-card class="box-card">
    <div slot="header" align="middle">
      <span class="title">{{subject.title}}</span>
    </div>
    <div align="middle">
      <el-button round @click="showAnswer = !showAnswer" type="info" :loading="loading">
        <span v-if="showAnswer">
          隐藏答案
        </span>
        <span v-else>
          查看答案
        </span>
      </el-button>
    </div>
    <el-collapse-transition>
      <div v-show="showAnswer" class="text item">
        <span v-html="subject.answer"></span>
      </div>
    </el-collapse-transition>
    <el-divider content-position="center">结束了</el-divider>
    <div align="middle">
      <el-button round @click="encore" type="success" :loading="loading">再来一题</el-button>
    </div>
  </el-card>

</template>

<script>
    export default {
        name: "Interview",
        data() {
            return {
                loading: false,
                showAnswer: false,
                subject: {
                    id: '',
                    category: '',
                    title: '',
                    answer: ''
                }
            }
        },
        methods: {
            getOne() {
                this.$api.getSubjectByRandom().then(response => {
                    this.subject = response.data;
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error.data);
                })
            },
            encore() {
                this.loading = true;
                this.getOne();
                this.loading = false;
                this.showAnswer = false;
            }
        },
        mounted() {
            this.getOne();
        }
    }
</script>

<style scoped>
  .title {
    font-size: 1.2em;
    font-weight: bolder;
  }

  .box-card {
    width: 480px;
    margin: 50px 80px;
  }
</style>