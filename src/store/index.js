import Vue from 'vue'
import Vuex from 'vuex'

import rentalLibraryStore from './rentalLibraryStore'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    rentalLibraryStore,
  },
})
