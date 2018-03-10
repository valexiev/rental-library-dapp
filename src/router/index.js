import Vue from 'vue'
import Router from 'vue-router'

// PAGES
import HomePage from '@/pages/HomePage'
import AddBookPage from '@/pages/AddBookPage'
import ArbitratorsPage from '@/pages/ArbitratorsPage'
import AddArbitratorPage from '@/pages/AddArbitratorPage'
import BooksPage from '@/pages/BooksPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/books',
      name: 'BooksPage',
      component: BooksPage,
    },
    {
      path: '/add-book',
      name: 'AddBookPage',
      component: AddBookPage,
    },
    {
      path: '/arbitrators',
      name: 'ArbitratorsPage',
      component: ArbitratorsPage,
    },
    {
      path: '/add-arbitrator',
      name: 'AddArbitratorPage',
      component: AddArbitratorPage,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  mode: 'history',
})
