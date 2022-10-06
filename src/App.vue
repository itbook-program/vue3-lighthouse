<template>
  <Layout></Layout>
</template>
<script lang="ts">
import Layout from './components/Layout/index.vue'
export default {
  components: {
    'Layout': Layout
  },
  setup() {
    
  },
}
</script>
<style>
body{
  padding: 0;
  margin: 0;
}
ul,li{ padding:0;margin:0;list-style:none}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
