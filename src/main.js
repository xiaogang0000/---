import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
import './mock/index'
import { Button, Loading,MessageBox,Notification,Message} from 'element-ui';
import './utils/validate'
import VueLazyload from 'vue-lazyload'
// import picture from './assets/images/loading.gif'

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)
Vue.component(Button.name, Button);


Vue.use(VueLazyload,{
    // loading:picture
})

//在vue的原型上添加所有提示类的组件
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
    el:'#app',
    beforeCreate(){
    Vue.prototype.$bus = this
    },
    router,
    store,
    render:h => h(App)
})