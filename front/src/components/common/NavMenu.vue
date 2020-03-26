<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <a href="/login" style="color: #222;float: right;padding: 20px;">登陆</a>
    <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">卓然米粉</span>
  </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data() {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/order', navItem: '点餐'},
          {name: '/discount', navItem: '促销'},
          {name: '/restaurant', navItem: '餐厅'},
          {name: '/about', navItem: '关于我们'}
        ]
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>

