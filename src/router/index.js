import Vue from "vue";
import VueRouter from "vue-router"
import Home from "../components/pags/Home"
import Login from "../components/pags/Login"
import Register from "../components/pags/Register"
import Search from "../components/pags/Search"
import Test from "../components/pags/Test"

// 1.将原始的push保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.Replace
//2.去修改VueRouter.prototype.push
VueRouter.prototype.push = function (location,okCallback,errCallback){
    if(okCallback || errCallback){
        return  originPush.call(this,location,okCallback,errCallback)
    }else{
        return originPush.call(this,location).catch(()=>{})
    }
}
VueRouter.prototype.Replace = function (location,okCallback,errCallback){
    if(okCallback || errCallback){
        return  originReplace.call(this,location,okCallback,errCallback)
    }else{
        return originReplace.call(this,location).catch(()=>{})
    }
}
// function enhance (target,funcName){
//   const origin = target.prototype.[funcName]
//   VueRouter.prototype.[funcName ]= function (location,okCallback,errCallback){
//     if(okCallback || errCallback){
//         return  originPush.call(this,location,okCallback,errCallback)
//     }else{
//         return originPush.call(this,location).catch(()=>{})
//     }
// }
// }

// enhance(Vuerouter,'push')

// enhance(Vuerouter,'replace')



Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      meta:{
        isHiddenfooter:true
      },
    },
    {
      path: "/register",
      component: Register,
      meta:{
        isHiddenfooter:true
      },
    },
    {
      path: "/search",
      component:Search,
    },
    {
       path:"/test",
       component:Test,
    },
    {
        path:'/',
        redirect:'/home',
    }
  ],
});
export default router;
