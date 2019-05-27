<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{msg}}
    <button @click="run"> a</button>
  </div>
</template>

<script>
    export default {
        name: 'about',
        data() {
            return {
                msg: 'ccc'
            }
        },
        methods:{
            run() {
                this.axios.get('http://localhost:8081/test').then((response) => {
                    // eslint-disable-next-line no-console
                    this.msg = response.data.aaa;
                }).catch((response)=>{
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                })
            }
        }
    }
</script>