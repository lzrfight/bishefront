import Vue from 'vue'
import Router from 'vue-router'
import Restaurant from "../components/restaurant/Restaurant"
const Login = () => import('../components/user/Login')
import Home from '../components/Home'
import AppIndex from "../components/home/AppIndex"
import Register from "../components/user/Register"
import NavMenu from "../components/common/NavMenu";
const AdminLogin = () => import('../components/admin/AdminLogin')
const BackIndex = () => import('../components/admin/BackIndex')
// import AdminLogin from "../components/admin/AdminLogin";
import Food from "../components/food/Food";
import FoodIndex from "../components/food/FoodIndex";
import Shopping from "../components/food/Shopping";
import order from "../components/order/order";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/home',
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
          path: '/food',
          name: 'FoodIndex',
          component: FoodIndex,
        },
        {
          path: '/restaurant',
          name: 'restaurant',
          component: Restaurant,
          meta: {

          }
        },
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
      path: '/admin',
      name: 'backindex',
      component: BackIndex
    },
    {
      path:'/loginadmin',
      name:'AdminLogin',
      component: AdminLogin
    },
    {
      path:'/shopping',
      name:'Shopping',
      component:Shopping,
    },
    {
      path:'/order',
      name:'order',
      component:order,
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
    // {
    //   path: '/backindex',
    //   name: 'backindex',
    //   component: BackIndex,
    // }
  ]
})
