import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import local from './local'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    local,
    user
  }
})
