import Vue from 'vue'
import Router from 'vue-router'
import Restaurant from "../components/restaurant/Restaurant"
const Login = () => import('../components/user/Login')
import Home from '../components/Home'
import AppIndex from "../components/home/AppIndex"
import Register from "../components/user/Register"
import BackIndex from "../components/adimin/BackIndex"

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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/backindex',
      name: 'backindex',
      component: BackIndex,
    }
  ]
})

export const createRouter = routes => new Router({
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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/backindex',
      name: 'backindex',
      component: BackIndex,
    }
  ]
})
