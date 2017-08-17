
/***@author blue @create date 2017-3-02 @info invTk.js***/

import api from '../../api/api';
import * as types from '../mutation';

const state = {
    md5Data:"",
    //是否有数据
    hasData:null,
    //当月是否有数据
    hasNowData:null,
    //当月数据
    nowData:null
};

const getters = {
};

const actions = {

    /*
     * 马币赎回[拉取后台加密]
     * */
    redeemMd5 ({ commit }) {

        api.redeemMd5(function (res) {
            commit(types.REDEEM_POST_MD5_SUCCESS, { res});
        })
    },

    /*
     * 马币赎回[邀请详情]
     * */
    redeemDts ({ commit }) {

        api.redeemDts(function (res) {
            res = (typeof res == "string")?JSON.parse(res):res;
            commit(types.REDEEM_POST_DTS_SUCCESS, { res});
        })
    }

};

const mutations = {

    [types.REDEEM_POST_MD5_SUCCESS] (state, {res}) {
       state.md5Data = res;
    },

    [types.REDEEM_POST_DTS_SUCCESS] (state, {res}) {
        if(res == undefined || res == null || res == ""){
            state.hasData = false;
        }else{
            state.hasData = true;

            if(res.length == 0){
                state.hasNowData = false;
            }else{
                state.hasNowData = true;
                state.nowData = res;
            }
        }
    }

};

export default{
    state,
    getters,
    actions,
    mutations
}
