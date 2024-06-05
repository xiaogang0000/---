import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { readToken, deleteToken } from "@/utils/auth";
import store from "@/store";
import { Message } from "element-ui";

// 1.将原始的push保存一份
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.Replace;
//2.去修改VueRouter.prototype.push
VueRouter.prototype.push = function (location, okCallback, errCallback) {
  if (okCallback || errCallback) {
    return originPush.call(this, location, okCallback, errCallback);
  } else {
    return originPush.call(this, location).catch(() => {});
  }
};
VueRouter.prototype.Replace = function (location, okCallback, errCallback) {
  if (okCallback || errCallback) {
    return originReplace.call(this, location, okCallback, errCallback);
  } else {
    return originReplace.call(this, location).catch(() => {});
  }
};
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
  routes,
  //scrollBehavior函数何时调用？---1.一上来就执行一次，2，每次跳路由的时候执行一次
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
//鉴权路径的路由
const authPath = ['/trade']

//使用全局导航守卫：1.维护用户信息；2，路由鉴权
router.beforeEach(async (to, from, next) => {
  //从local中读取token
  const token = readToken();
  //判断token是否存在
  if (token) {
    console.log("我读取到了你的token");
    //读取vuex中的用户信息
    const { userInfo } = store.state.user;
    //userInfo是否为空对象
    if (userInfo.id) {
      console.log("vuex中有用户信息，看来是有啥要啥，直接放行");
      next();
    } else {
      //没有用户信息
      console.log("vuex没有用户信息，我要携带者token");
      try {
        //获取用户信息
        console.log("获取信息成功，想去哪就去哪");
        await store.dispatch("gerUserInfo");
        next();
      } catch (error) {
        //获取用户信息失败
        console.log("获取信息失败了，您的token应该是过期了，我引导你登录");
        //删除用户信息
        deleteToken();
        //放行
        next("/login");
      }
    }
  } else {
    //没有token
    console.log(
      "没有读取到你的token，你没登录，我得看看你是不是去的是敏感路由"
    );
   if(authPath.includes(to.path)){
    console.log('你看了敏感路由，登录再说吧')
    Message.warning('请你先登录')
    next('/login')
   }else{
    console.log('你看的不是敏感路由，你随意')
    next()
   }
  }
});
export default router;
