<template>
    <baidu-map class="map" center="桂林">
  <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_BIG" @click="clickHandler"></bm-point-collection>
  </baidu-map>
</template>

<script>
    export default {
        name: "restaurant",
     data () {
      return {
        points: []
      }
    },
      mounted() {
          this.addPoints()
      },
      methods: {
      clickHandler (e) {
        alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
      },
      addPoints () {
        const points = [];
        const  position = {lng:110.421862,lat: 25.325509}
        points.push(position)
        // for (var i = 0; i < 1000; i++) {
        //   const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21}
        //   points.push(position)
        this.points = points
        },

      }
  }
</script>

<style scoped>
  .map{
    width: 100%;
    height: 1000px;
  }
</style>

