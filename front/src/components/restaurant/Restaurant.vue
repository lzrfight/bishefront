<template>
<!--    <baidu-map class="map" center="中国" scroll-wheel-zoom="true">-->
<!--  <bm-point-collection :points="points" color="red" size="BMAP_POINT_SIZE_BIG" @click="clickHandler"></bm-point-collection>-->
<!--      <label>关键词：<input v-model="keyword"></label>-->
<!--      <label>地区：<input v-model="location"></label>-->
<!--  </baidu-map>-->
  <div>
  <baidu-map scroll-wheel-zoom="true" ::autoLocation="true">
    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT" style=""></bm-city-list>
    <bm-view class="map"></bm-view>
    <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" :selectFirstResult="true" :pageCapacity = 1></bm-local-search>
  </baidu-map>
  </div>
</template>

<script>
    export default {
        name: "restaurant",
     data () {
      return {
        points: [],
        keyword:[],
        location:''
      }
    },
      mounted() {
          this.addPoints()
      },
      methods: {
        clickHandler(e) {
          alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
        },
        addPoints() {
          const _this = this
          this.$axios.post('/address').then(resp =>
          {
            if (resp && resp.status ===200)
            {
              _this.keyword = resp.data
            }
          })
        }
      }
  }
</script>

<style scoped>
  .map{
    width: 100%;
    height: 1000px;
  }
</style>

