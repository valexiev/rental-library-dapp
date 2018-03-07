import Vue from 'vue'

// Import always before all components
import '@/styles/main-begin.scss'

// NODE MODULES
import BootstrapVue from 'bootstrap-vue'

// APP PACKAGES
import App from './App'
import router from './router'

// Import always after all components
import '@/styles/main-end.scss'


Vue.config.productionTip = !process.env.APP_DEBUG

// USE PLUGINS
Vue.use(BootstrapVue)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
