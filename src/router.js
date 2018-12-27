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
          redirect: '/index',
          
        },
        {
          path: '/index',
          component: resolve => require(['@/components/index/Index'], resolve),
          children: [
            {
              path: '/Redis',
              component: resolve => require(['@/components/content/Redis'], resolve)
            },
            {
              path: '/Es',
              component: resolve => require(['@/components/content/Es'], resolve)
            },
            {
              path: '/Vue',
              component: resolve => require(['@/components/content/Vue'], resolve)
            }
          ]
        },
      ]
    }
  ]
})