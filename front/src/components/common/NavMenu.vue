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
    <a href="/login" style="color: #222;float: right;padding: 20px;">登陆/注册</a>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">卓然米粉</span>
  </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data() {
      return {
         username: this.$store.state.user.username,
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/food', navItem: '点餐'},
          {name: '/discount', navItem: '促销'},
          {name: '/restaurant', navItem: '餐厅'},
          {name: '/about', navItem: '关于我们'}
        ]
      }
    },
    // mounted: function () {
    //   this.loadUser()
    // },
    methods:
      {
        logout(){
          const _this = this;
          this.$axios.get('/logout').then(resp =>
          {
            if (resp && resp.data.code === 200)
            {
              _this.$store.commit('logout');
              _this.$router.replace('/index');
              this.  username = "登陆注册"
              this.$alert('退出成功','提示',{
                confirmButtonText:'确定'
              })
            }
          }).catch(failResponese => {this.$alert('退出没反应都操了','提示',{
            confirmButtonText:'确定'
          })})
        },
      },

  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>

