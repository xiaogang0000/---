import { reqCategoryList,reqSlideList,reqFloorList } from "@/api"




const actions ={
    //专门用于获取三类分级信息----服务员
  async  getCategoryList({commit}){
    //调用reqCagetoryList去联系服务器，要三级分类表
    const result= await reqCategoryList()
    //判断业务逻辑是否成功
    if(result.code === 200){
      commit('SAVE_CATEGORY_LIST',result.data.slice(0,15))
    // console.log(result.data)
    }else{
        alert(result.message)
    }
  },
 async getslideList({commit}){
const result = await reqSlideList()
  if(result.code ===200){
    commit ('SAVE_SLIDE_LIST',result.data)
  }else{
    alert(result.message)
  }
  },
  async getfloorList({commit}){
    const result = await reqFloorList()
    if(result.code === 200){
      commit ('SAVE_FLOOR_LIST',result.data)
    }else{
      alert(result.message)
    }
  }
}


const mutations = {
  //保存分类数据
    SAVE_CATEGORY_LIST(state,list){
      state.categoryList = list
    },
    //保存首页轮播图数据
    SAVE_SLIDE_LIST(stete,list){
      state.slideList = list
    },
    SAVE_FLOOR_LIST(state,list){
    state.floorList = list
    }
}


const state = {
    categoryList:[] ,
    slideList:[],
    floorList:[],
}
const getters = {}

export default  {
    actions,
    mutations,
    state,
    getters
}