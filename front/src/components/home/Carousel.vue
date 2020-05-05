<template>
<!--class与style绑定-->
  <el-card class="card-carousel">
    <el-carousel  class="push" :interval="1500" arrow="always">
<!--v-for对列表进行遍历 items里的东西放在item里-->
      <el-carousel-item v-for="item in items" :key="item.id">
<!--a href target blank在新窗口打开连接 self当前 parent父窗口-->
<!--图片来源item里的img-->
          <img :src=item.img alt="" class="carousel_img">
        <h3>{{item.title}}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<style>
  .el-carousel__item h3 {
    color: black;
    font-size: 15px;
    /*line-height: 300px;*/
    bottom: 43px;
    float: left;
    position: relative;
  }
  .card-carousel {
    margin: 0 auto;
    /*margin-top: 50px;*/
    /*margin-left: 800px;*/
    width: 680px;
    height: 320px;
  }
  .push {
    /*margin-left: -15px;*/
  }
  .el-carousel__item:nth-child(2n) {
    background: black;
  }
  .el-carousel__item:nth-child(2n+1) {
    background: black;
  }
  .carousel_img {
    height: 100%;
    width: 100%;
    text-align: center;
  }
</style>

<script>
  export default {
    name: 'Carousel',
    data: function () {
      return {
        items: [{
          id: 1,
          title: '米粉1',
          img: '../../../static/img/carousel/mifen1.jpg',
         },
          {
            id: 2,
            title: '米粉2',
            img: '../../../static/img/carousel/mifen2.jpg',
          },
          {
            id: 3,
            title: '米粉3',
            img: '../../../static/img/carousel/mifen3.jpg',
          }]
      }
    }
  }
</script>
