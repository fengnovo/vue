import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home'
import Detail from '@/containers/Detail'
import User from '@/containers/User'
import Login from '@/containers/Login'
import Publish from '@/containers/Publish'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
  ]
})
