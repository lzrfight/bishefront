<template>
  <div>
    <carousel></carousel>
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

