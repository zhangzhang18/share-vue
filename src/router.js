import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '/',
          redirect: '/index'
        },
        {
          path: '/index',
          component: resolve => require(['@/components/first'], resolve)
        },
        {
          path: '/second',
          component: resolve => require(['@/components/second'], resolve)
        },
      ]
    }
  ]
})