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
  if (store.state.adminuser.adminname && to.path.startsWith('/admin'))
  {
    initAdminMenu(router,store)
    console.info("金融1")
  }
  if (store.state.adminuser.adminname && to.path.startsWith('/loginadmin'))
  {
    next(
      {
        path: '/admin'
      })
  }
  else {
    next()
    console.info("进入next")
  }
 })
const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  // if (store.state.adminMenus.length > 0) {
  //   return
  // }
  console.info("能进入init方法")
  axios.get('/menu').then(resp => {
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
