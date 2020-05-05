<template>
  <div>
    <carousel style="width: 100%;height: 100%"></carousel>
    <a href="/restaurant">
    <img src="@/assets/寻找餐厅.png" style="width: 100%"  alt="寻找餐厅.png" >
    </a>
    <a href="/login">
    <img src="@/assets/joinus.png" style="width: 100%"  alt="joinus.png">
    </a>
  <router-view/>
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

