// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'Y1EV7WFc0COFApGokHLvb3iZYMHeS11q'
})

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
//携带sessionID
axios.defaults.withCredentials = true
Vue.use(ElementUI)
/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {
//       if (store.state.user.username) {
//         next()
//       } else {
//         next({
//           path: 'login',
//           query: {redirect: to.fullPath}
//         })
//       }
//     } else {
//       next()
//     }
//   }
// )

// //这里有问题 一使用就直接空白 什么也没有不知道什么问题
router.beforeEach((to,from,next) =>
{
  if (store.state.user.username && to.path.startsWith('/admin'))
  {
    initAdminMenu(router,store)
    console.info("金融1")
  }
  if (store.state.user.username && to.path.startsWith('/system'))
  {
    next(
      {
        path: '/admin'
      })
  }if (to.meta.requireAuth) {
  //判断 store 里有没有存储 user 的信息，如果存在，则放行
  if (store.state.user) {
    axios.get('/authentication').then(resp=>{
      console.log(resp)
      if (resp.data) {
        next();
      }
    })
  }else{//否则跳转到登录页面
    //并存储访问的页面路径（以便在登录后跳转到访问页）
    next({
      path:'/login',//应该要修改这个路径
      query:{redirect:to.fullPath}
    })
  }
}else {
  next();
}
})

const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    return
  }
  console.info("能进入init方法")
  axios.post('/menu', {
   username: store.state.user.username
  }).then(resp => {
    if (resp && resp.status === 200) {
      // console.info(resp.data)
      var fmtRoutes = formatRoutes(resp.data)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
      console.info("能高出menu")
      console.info(fmtRoutes)
    }
  })
}

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      namezh: route.namezh,
      icon: route.icon,
      // meta: {
      //   requireAuth: true
      // },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
