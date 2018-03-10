import Vue from 'vue'

// NODE MODULES
import BootstrapVue from 'bootstrap-vue'

// APP PACKAGES
import App from './App'
import router from './router'
import { store } from './store'


Vue.config.productionTip = !process.env.APP_DEBUG

// USE PLUGINS
Vue.use(BootstrapVue)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
