
/***@author blue @create date 2017-2-10 @info read.js***/

import api from '../../api/api';
import * as types from '../mutation';

const state = {
    openStatus: null,/*速闻阅读是否开启*/
    validReadCount: 10,/*文章阅读数*/
    isNew: null,/*是否是老用户*/
    adReadValidMinuteTime: "",/*活动开启时长*/
    openTime: "",/*活动开启时间*/
    sysNowTime: "",/*服务器系统时间*/
    readTime: "",/*剩余时间*/
    count: null,/*剩余时间*/
    dsq:true,/*定时器标识*/
    code:null,
    isPopUp:true
};

const getters = {

};

const actions = {

    /*
     * 相关状态
     * */
    readInfo ({ commit }) {
        api.readInfo(function (res, code) {

            res = JSON.parse(res);

            // 获取速闻阅读是否开启状态 新老用户判断 阅读数
            commit(types.READ_GET_OPENINFO_SUCCESS, {res, code});

            // 倒计时显示
            let time = Number(res.openTime) + Number(res.adReadValidMinuteTime) * 60*1000 - res.sysNowTime;

            if(time > 0 && state.dsq == true){

                commit(types.READ_DSQ_SUCCESS,{});
                commit(types.READ_GET_INFO_SUCCESS, { time});

                const count = setInterval(function(){
                    time -= 1000;
                    commit(types.READ_GET_INFO_SUCCESS, {time});

                    if(time <= 0){
                        clearInterval(count);
                        window.location = '/read'+ window.location.search;
                    }

                },1000);
            }
        })
    },

    /*
     * 开启速闻阅读活动
     * */
    readOpen ({dispatch, commit }) {
        api.readOpen(function (msg) {
            commit(types.READ_GET_OPEN_SUCCESS,{msg});
            return dispatch('readInfo');
        })
    }

};

const mutations = {

    /*
     * 速闻阅读相关信息
     * */
    [types.READ_GET_OPENINFO_SUCCESS] (state, { res, code }) {

        state.isNew = JSON.parse(res.isNew);
        state.code = (typeof code) == "string"?JSON.parse(code):code;

        state.openStatus = (typeof res.openStatus)=="string"?JSON.parse(res.openStatus):res.openStatus;
        if(res.validReadCount){
            state.validReadCount = JSON.parse(res.validReadCount);
        }
    },

    /*
     * 开启速闻阅读
     * */
    [types.READ_GET_OPEN_SUCCESS] (state, { msg }) {
        // console.log(msg);
        state.openStatus = 1;
    },

    //定时器关闭
    [types.READ_DSQ_SUCCESS] (state, {}) {
        state.dsq = false
    },

    /*
     * 速闻阅读相关信息
     * */
    [types.READ_GET_INFO_SUCCESS] (state, { time}) {
        state.readTime = time;
    }

};

export default{
    state,
    getters,
    actions,
    mutations
}
