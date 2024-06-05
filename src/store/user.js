import { reqUserInfo, reqLogout } from "@/api";
import { Message } from "element-ui";
import router from "@/router";
import {deleteToken} from '@/utils/auth'

//获取用户信息
const actions = {
  async gerUserInfo({ commit },value) {
    const result = await reqUserInfo();
    if (result.code === 200) {
      commit("SAVE_USER_INFO", result.data);
    } else {
      Message.warning("请先登录");
      return Promise.reject();
    }
  },
  async logout({ commit }) {
    //联系服务器退出登录（销毁token）
    const result = await reqLogout();
    if (result.code === 200) {
      Message.success('登录成功');
      //退出登录成功
      deleteToken();
      //清空vuex中的用户信息
      commit("DELETE_USER_INFO");
      //跳转到login
      router.push("/login");
    } else {
      //退出登录失败（文件正在上传中，把所有视频合在一块）
      Message.warning(result.message);
    }
  },
};

const mutations = {
  SAVE_USER_INFO(state, info) {
    state.userInfo = info;
  },
  DELETE_USER_INFO() {
    state.userInfo = [];
  },
};

const state = {
  userInfo: {},
};

const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
