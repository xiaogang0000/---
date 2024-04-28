import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import './mock/index'

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)

new Vue({
    el:'#app',
    router,
    store,
    render:h => h(App)
})