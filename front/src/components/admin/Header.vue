<template>
  <el-card class="admin-header" >

<!--    <a href="/index">-->
<!--      操-->
<!--    </a>-->
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">卓然米粉</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
    <a  style="color: #222;float: right;padding: 10px;">{{adminname}}</a>
  </el-card>
</template>

<script>
  import {createRouter} from '../../router'
  export default {
    name: 'Header',
    data(){
      return{
        adminname: this.$store.state.user.username
      }
    },
    methods: {
      logout () {
            this.$router.replace('/index')

      }
    }
  }
</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
    background-color: ;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>
