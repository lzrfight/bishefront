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
    <a style="color: #222222;float: right;padding: 20px;">{{username}}</a>
    <a href="/login" style="color: #222;float: right;padding: 20px;" v-if="showlogin">登陆/注册</a>

<!--    <a  style="color: #222;float: right;padding: 20px;" v-if = "showusername">{{username}}</a>-->
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">卓然米粉</span>
  </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data() {
      return {
        username: '',
        showlogin: true,
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/food', navItem: '点餐'},
          {name: '/discount', navItem: '促销'},
          {name: '/restaurant', navItem: '餐厅'},
          {name: '/system', navItem: '个人中心'}
        ]
      }
    },
    mounted: function () {
      this.panduan();
    },
    methods:
      {
        logout(){
          const _this = this;
          this.$axios.get('/logout').then(resp =>
          {
            if (resp && resp.data.code === 200)
            {
              _this.$store.commit('logout');
              this.$alert('退出成功','提示',{
                confirmButtonText:'确定'
              }).then(this.panduan)
            }
          }).catch(failResponese => {this.$alert('退出没反应都操了','提示',{
            confirmButtonText:'确定'
          })})
        },
        // showlogin() {
        //   if (store.state.user.username == null)
        //     return true
        //   else
        //   {
        //     return false
        //   }
        // },
        panduan()
        {
           if (this.$store.state.user.username == null)
           // if(this.$store.state.user.username.length==0)
          {
            console.log("用户名为空,当前用户名长度为: "+this.$store.state.user.username)
            this.showlogin = true;
            this.username= ''
          }else if(this.$store.state.user.username.length !== 0)
          {
            console.log("当前用户名："+this.username);
            this.showlogin = false;
            this.username = this.$store.state.user.username
          }
        }
      },
    // created() {
    //   if (sessionStorage.getItem('store')) {
    //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    //   }
    //   // 在页面刷新时将store保存到sessionStorage里
    //   window.addEventListener('beforeunload', () => {
    //     sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    //   })
    // }

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

