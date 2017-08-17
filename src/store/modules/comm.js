
/***@author blue @create date 2017-3-27 @info comm.js***/

import * as types from '../mutation';
/*
 * 通用的配置，例如顶部的配置跟地址菜单
 *
 *
 * */
const state = {
    isShare:false,  //是否显示分享
    title:'',  //显示标题内容
    showLoading: true, //显示加载动画
    mark:false,  //是否显示遮罩,
    isPopUp:false    //默认不显示弹框
};

const actions  = {

    // commConf({commit},settings){
    //     commit(types.COMM_LOADING_STATUS,settings);
    // },

    markStatus({commit},status){
        commit(types.COMM_MARK_STATUS,status);
    },

    openPopUp({commit},status){
        commit(types.COMM_POPUP_STATUS,status);
    },

    clsPopUp({commit},status){
        commit(types.COMM_CLSPOPUP_STATUS,status);
    },

    showLoading({commit},status){
        commit(types.COMM_LOADING_STATUS,status);
    }
};


const getters = {
    commConf : state => state,
    loading : state => state.loading,
    markStatus : state => state.mark
};

const mutations = {

    [types.COMM_CONF](state,settings){
        state = Object.assign(state,settings);
    },

    [types.COMM_LOADING_STATUS](state,status){
        state.showLoading = status;
    },

    [types.COMM_MARK_STATUS](state,status){
        state.mark = status
    },

    [types.COMM_POPUP_STATUS](state,st){
        state.isPopUp = true;
    },

    [types.COMM_CLSPOPUP_STATUS](state,st){
        state.isPopUp = false;
    }

};

export default {
  state,
  actions,
  getters,
  mutations
}
