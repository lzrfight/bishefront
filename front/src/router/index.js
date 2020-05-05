import Vue from 'vue'
import Router from 'vue-router'
import Restaurant from "../components/restaurant/Restaurant"
const Login = () => import('../components/user/Login')
import Home from '../components/Home'
import AppIndex from "../components/home/AppIndex"
import Register from "../components/user/Register"
import NavMenu from "../components/common/NavMenu";
const BackIndex = () => import('../components/admin/BackIndex')
import Food from "../components/food/Food";
import FoodIndex from "../components/food/FoodIndex";
import Shopping from "../components/food/Shopping";
import order from "../components/order/order";
import AllOrder from "../components/admin/superadmin/AllOrder";
import New from "../components/new/New";
import face from "../components/face";
import board from "../components/admin/superadmin/board";
import ArticalEditor from "../components/admin/superadmin/ArticalEditor";
import NewDetail from "../components/new/NewDetail";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/face',
      name:'face',
      component: face
    },
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
        },
        {
          path: '/new',
          name: 'new',
          component: New
        },
        {
          path:'/new/article',
          name:'NewDetail',
          component:NewDetail
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
      path: '/admin',
      name: 'backindex',
      component: BackIndex,
      children:[
        {
          path: '/admin/superadmin/allorder',
          name: 'allorder',
          component: () => import('../components/admin/superadmin/AllOrder'),
        }
      ]
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
    },
    {
      path:'/editor',
      name:'ArticalEditor',
      component: ArticalEditor,
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

        },
        {
          path: '/restaurant',
          name: 'restaurant',
          component: Restaurant,
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
