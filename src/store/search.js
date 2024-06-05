//search 的模块仓库
import { reqSearchInfo } from "@/api"



const actions = {
  async  getsearchInfo({commit},params={}){
     //reqGetSearchInfo()这个函数在调取服务器数据的时候，至少传递一个空对象
     //params形参：是当用户派发actions的时候，第二个参数传过来的时候，至少是一个空对象
   const result =  await reqSearchInfo(params)
    //   console.log(result.data)
    if(result.code === 200){
        commit("SAVE_SEARCH_INFO",result.data)
    }else{
        alert(result.message)
    }
     }
}
const mutations = {
    SAVE_SEARCH_INFO(state,searchInfo){
      state.getsearchInfo = searchInfo
    }
}
//计算属性，在项目当中：简化仓库中的数据（简化数据而生）
//可以把我们将来在组件中，当需要用的数据简化一下
const getters = {
    //当前形参state，当前中的state，并非大仓库中的那个state
//     goodsList(state){
// //假如网络不给力或者没有网，返回的undefined
//         return state.getsearchInfo.goodsList || []
//     },
    trademarkList(state){
        return state.getsearchInfo.trademarkList
    },
    attrsList(state){
        return state.getsearchInfo.attrsList
    }
}
const state = {
    searchInfo: {}
}

export default {
  state,
  mutations,
 actions,
 getters,

}
