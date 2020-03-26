import Vue from 'vue'
import Router from 'vue-router'
import Restaurant from "../components/Restaurant"
const Login = () => import('../components/Login')
import Home from '../components/Home'
import AppIndex from "../components/home/AppIndex";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/restaurant',
          name: 'restaurant',
          component: Restaurant,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
