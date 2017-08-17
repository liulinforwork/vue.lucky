
/***@author blue @create date 2017-2-10 @info index.js***/

import api from '../../api/api';
import * as types from '../mutation';

const state = {

    showTask: true,/*是否显示邀新任务模块*/
    showTime: false,/*是否显示时间*/
    endTime: "",/*截止时间*/
    dsq: "",/*定时器*/
    bannerData: ""/*bannerData数据*/
};
const getters = {

};

const actions = {

    /*
    * 获取首页活动截止时间
    * */
    indexGetTime ({ commit }) {
        api.indexGetTime(function (res) {

            res= JSON.parse(res);

            //是否显示邀新任务
            commit(types.INDEX_GET_SHOWTASK_SUCCESS, { res });

            /*新用户时间显示*/
            if(res.regSingEndTime){
                let time = Number(res.regSingEndTime)- res.sysNowTime;
                if(time > 0){

                    commit(types.INDEX_GET_TIME_SUCCESS, { res,time});
                }
            }
            /*老用户时间显示*/
            else if(res.signEndTime){
                let time = Number(res.signEndTime)- res.sysNowTime;
                if(time > 0){
                    commit(types.INDEX_GET_TIME_SUCCESS, {time});
                }
            }
        })
    },

    /*
     * time-1000
     * */
    indexClear({ commit }){
        commit(types.INDEX_DSQ_SUCCESS, { state});
    },

    /*
    * 首页动态banner图设置
    * */
    indexBanner({ commit }){

        api.indexBanner(function (d) {

            d.data = (typeof d.data == "string")?JSON.parse(d.data):d.data;

            let time = d.systemTime,arr=[];
            for(var value of d.data){
                //push前 && push后
                // if(value.pushTime > time || value.pushEndTime < time){
                //     // break;
                // }
                //push中
                if(value.pushTime < time && value.pushEndTime > time){
                    arr.push(value);
                }
            }
            // console.log(arr);
            commit(types.INDEX_BANNERDATA_SUCCESS,{arr});
        })
    }

};

const mutations = {

    //是否显示邀新任务
    [types.INDEX_GET_SHOWTASK_SUCCESS] (state, {res}) {
        state.showTask = JSON.parse(res.showTask);
    },

    //显示时间
    [types.INDEX_GET_TIME_SUCCESS] (state, {time}) {
        state.showTime = true;/*显示时间*/
        state.endTime = time;/*显示时间*/
    },

    // //定时器标志关闭 此时已有定时器正在运行
    [types.INDEX_DSQ_SUCCESS] (state, {}) {
        state.endTime -= 1000;
        if(state.endTime<0){
            state.showTime = false;/*显示时间*/
        }
    },

    // bannerData
    [types.INDEX_BANNERDATA_SUCCESS] (state, {arr}) {
        state.bannerData = arr;
    }
};
export default{
    state,
    getters,
    actions,
    mutations
}
