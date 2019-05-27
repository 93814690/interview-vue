<template>
  <div id="app" style="position:absolute; left:0; top:0; width:100%;height:100%;">
    <el-header class="header">
      <v-header/>
    </el-header>
    <el-container>
      <el-aside style="width: 200px" class="aside">
        <v-aside/>
      </el-aside>
      <el-main type="flex" class="main">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import Aside from "./components/Aside";
    import Header from "./components/Header";

    export default {
        name: 'app',
        components: {
            'v-aside': Aside,
            'v-header': Header
        }
    }
</script>

<style>
  body {
    margin: 0;
  }

  .header {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
  }

  .main {

  }

</style>
