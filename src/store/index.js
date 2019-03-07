import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    inventry:[]
  },
  getters: {
    getinventry(state){
      return state.inventry
    },
    
  },
  actions: {
    storeinventry(context,data){
        context.commit('storeinventry', data) 
    }

  },
  mutations: {
    storeinventry(state, data){
      state.inventry = data
    },
    
    
  }

})
