<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
          default-active="/"
          unique-opened
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">随机题目</span>
        </el-menu-item>
        <el-menu-item index="/subject" >
          <i class="el-icon-menu"></i>
          <span slot="title">所有题目</span>
        </el-menu-item>
        <el-menu-item index="/category">
          <i class="el-icon-location"></i>
          <span slot="title">类别管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>题目管理</span>
          </template>
          <el-menu-item-group class="over-hide" >
            <el-menu-item index="subject/add">添加题目</el-menu-item>
            <el-menu-item index="subject/list">题目列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>

</template>

<script>
    export default {
        name: "Aside",
        data() {
            return {
                submenu: [
                    {
                        name: '全部',
                        id: '1'
                    },
                    {
                        name: '基础',
                        id: '2'
                    }
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>

<style scoped>
  .over-hide {
    overflow: hidden;
  }
</style>