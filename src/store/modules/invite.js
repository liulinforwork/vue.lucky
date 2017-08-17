
/***@author blue @create date 2017-3-02 @info invite.js***/

import api from '../../api/api';
import util from '../../util/util';
import * as types from '../mutation';

const state = {
    openStatus: null,/*速闻阅读是否开启*/
    inviteUserIds: 0,/*文章阅读数*/
    inviteTime:"",
    dsq:true,
    code:null
};

const getters = {
};

const actions = {

    /*
     * 邀请活动相关信息
     * */
    inviteInfo ({ commit }) {
        api.inviteInfo(function (res,code) {

            res = JSON.parse(res);

            // 获取邀请活动相关信息
            commit(types.INVITE_POST_INFO_SUCCESS, { res , code});

            let time = Number(res.expirationDate)- res.nowDate;
            if(time > 0 && state.dsq == true){

                commit(types.INVITE_DSQ_SUCCESS,{});
                commit(types.INVITE_POST_TIME_SUCCESS, { time});

                var count = setInterval(function(){
                    time -= 1000;
                    commit(types.INVITE_POST_TIME_SUCCESS, { time});
                    if(time <= 0){
                        clearInterval(count);
                        window.location = '/invite'+ window.location.search;
                    }
                },1000);
            }
        })
    },

    /*
     * 开启邀请活动
     * */
    inviteOpen ({dispatch, commit }) {

        api.inviteOpen(function (msg) {
            commit(types.INVITE_POST_OPEN_SUCCESS, { msg });
            return dispatch('inviteInfo')
        })
    },

    /*
     * 调用原生分享方法
     * */
    inviteUser({},share){
        util.inviteUser(function (res) {
            // console.log(res);
        },share)
    }

};

const mutations = {

    /*
     * 邀请活动相关信息
     * */
    [types.INVITE_POST_INFO_SUCCESS] (state, { res,code }) {

        state.code = (typeof code) == "string"?JSON.parse(code):code;

        state.openStatus = (typeof res.openStatus)=="string"?JSON.parse(res.openStatus):res.openStatus;
        if(res.inviteUserIds){
            state.inviteUserIds = (typeof res.inviteUserIds)=="string"?JSON.parse(res.inviteUserIds):res.inviteUserIds;
        }
    },

    //定时器关闭
    [types.INVITE_DSQ_SUCCESS] (state, {}) {
        state.dsq = false
    },

    /*
     * time
     * */
    [types.INVITE_POST_TIME_SUCCESS] (state, { time}) {
        state.inviteTime = time;
    },

    /*
     * 开启邀请活动
     * */
    [types.INVITE_POST_OPEN_SUCCESS] (state, { msg }) {
        //开启成功后，调取邀请活动详情接口，请求的res放到 INVITE_POST_OPEN_SUCCESS 里面
        // console.log(msg);
        state.openStatus = 1;
    }

};

export default{
    state,
    getters,
    actions,
    mutations
}
