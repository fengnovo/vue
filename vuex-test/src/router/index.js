import Vue from 'vue'
import Router from 'vue-router'
import Test1 from '@/components/Test1'
import Test2 from '@/components/Test2'
import Test3 from '@/components/Test3'
import Test4 from '@/components/Test4'
import Test5 from '@/components/Test5'
import Test6 from '@/components/Test6'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Test1
    },
    {
      path: '/Test1',
      component: Test1
    },
    {
      path: '/Test2',
      name: 'Test2',
      component: Test2
    },
    {
      path: '/Test3',
      name: 'Test3',
      component: Test3
    },
    {
      path: '/Test4',
      name: 'Test4',
      component: Test4
    },
    {
      path: '/Test5',
      name: 'Test5',
      component: Test5
    },
    {
      path: '/Test6',
      name: 'Test6',
      component: Test6
    },
    
  ]
})
