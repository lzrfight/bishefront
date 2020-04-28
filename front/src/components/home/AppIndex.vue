<template>
  <div>
    <carousel></carousel>
  <router-view/>
    <span>公告</span>
    <el-divider ></el-divider>
    <span>公告1 毕设真是从0学起，太难了</span>
  </div>


</template>

<script>
  import Carousel from "./Carousel"
    export default {
      name: "AppIndex",
      components: {Carousel}
    }
</script>

<style scoped>

</style>

