import Vue from 'vue'
import vuex from 'vuex'
import user from './user'
import home from './home'

Vue.use(vuex)


const actions ={}

const mutations = {}

const state = {}

const getters = {}

const store = new vuex.Store({
    actions ,
    mutations,
    state,
    getters,
    modules:{
       home,user 
    }
})
export default store