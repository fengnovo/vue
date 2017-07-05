import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Axios from '@/components/Axios'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Axios',
      name: 'Axios',
      component: Axios
    }
  ]
})
