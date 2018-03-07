import Vue from 'vue'
import Router from 'vue-router'

// PAGES
import HomePage from '@/pages/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
  ],
})
