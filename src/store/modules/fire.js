
/***@author blue @create date 2017-2-10 @info fire.js***/

import api from '../../api/api';
import * as types from '../mutation';

const state = {
  isNew: null/*是否是老用户*/
};

const getters = {

};

const actions = {

  /*
   * 搭伙线
   * */
  fireNew ({ commit }) {

    //请求的res放到 FIRE_POST_INFO_SUCCESS 里面
    api.fireNew(function (res) {
        res = JSON.parse(res);
        commit(types.FIRE_POST_INFO_SUCCESS, { res });
    })
  }

};

const mutations = {
    /*
     * 搭伙线相关信息
     * */
    [types.FIRE_POST_INFO_SUCCESS] (state, { res }) {
        state.isNew = JSON.parse(res.isNew);
    }
};

export default{
    state,
    getters,
    actions,
    mutations
}
