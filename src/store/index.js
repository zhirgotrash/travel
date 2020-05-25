import Vue from 'vue'
import Vuex from 'vuex'
import cities from './modules/cities.js'
import travel from './modules/travel.js'
import total from './modules/total.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
	cities,
	travel,
  total
  }
})
