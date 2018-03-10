import rentalLibraryService from '@/contracts/rentalLibraryService'

const state = {
  books: [],
  arbitrators: [],
  ISBNarr: [],
}

const getters = {
  arbitrators(state) {
    return state.arbitrators
  },
  ISBNarr(state) {
    return state.ISBNarr
  },
}

const mutations = {
  setArbitrators(state, payload) {
    state.arbitrators = payload
  },
  addArbitrator(state, payload) {
    state.arbitrators.push(payload)
  },
  removeArbitrator(state, payload) {
    const index = state.arbitrators.indexOf(payload)
    state.arbitrators.splice(index, 1)
  },
  setISBNarr(state, payload) {
    state.ISBNarr = payload
  },
}

const actions = {
  addBook({ commit }, formData) {
    return rentalLibraryService.addBook(formData)
      .then(res => {
        // commit('setGroups', groups)
        return res
      })
  },
  loadISBNs({ commit }) {
    return rentalLibraryService.getISBNs()
      .then(res => {
        commit('setISBNarr', res)
        return res
      })
  },
  loadArbitrators({ commit }) {
    return rentalLibraryService.getArbitrators()
      .then(res => {
        commit('setArbitrators', res)
        return res
      })
  },
  addArbitrator({ commit }, formData) {
    return rentalLibraryService.addArbitrator(formData)
      .then(res => {
        commit('addArbitrator', res)
        return res
      })
  },
  removeArbitrator({ commit }, arbAddr) {
    return rentalLibraryService.removeArbitrator(arbAddr)
      .then(res => {
        commit('removeArbitrator', arbAddr)
        return res
      })
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
