import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import News from '@/components/News'
import ImpInfo from '@/components/ImpInfo'
import Cabinet from '@/components/Cabinet'
import Login from '@/components/Auth/Login'
import Reg from '@/components/Auth/Reg'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/impinfo',
      name: 'impinfo',
      component: ImpInfo
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: Cabinet
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    }
  ]
})
