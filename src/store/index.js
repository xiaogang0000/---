import Vue from "vue";
import vuex from "vuex";
import user from "./user";
import home from "./home";
import search from "./search";

Vue.use(vuex);

const actions = {};

const mutations = {};

const state = {};

const getters = {};

const store = new vuex.Store({
  actions,
  mutations,
  state,
  getters,
  modules: {
    home,
    user,
    search,
  },
});
export default store;
