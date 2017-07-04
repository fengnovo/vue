import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import Moban from '@/components/Moban'
import ComputedWatch from '@/components/ComputedWatch'
import Shenming from '@/components/Shenming'
import ListFunction from '@/components/ListFunction'
import Component from '@/components/Component'
import Shengmingzhouqi from '@/components/Shengmingzhouqi'
import Aync from '@/advanced/Aync'


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
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/moban',
      name: 'Moban',
      component: Moban
    },
    {
      path: '/computedWatch',
      name: 'ComputedWatch',
      component: ComputedWatch
    },
    {
      path: '/shenming',
      name: 'shenming',
      component: Shenming
    },
    {
      path: '/listFunction',
      name: 'listFunction',
      component: ListFunction
    },
    {
      path: '/component',
      name: 'Component',
      component: Component
    },
    {
      path: '/shengmingzhouqi',
      name: 'Shengmingzhouqi',
      component: Shengmingzhouqi
    },
    {
      path: '/aync',
      name: 'Aync',
      component: Aync
    },
  ]
})
