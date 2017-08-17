
/***@author blue @create date 2017-3-02 @info invTk.js***/

import api from '../../api/api';
import * as types from '../mutation';

const state = {
    //邀请人数
    count: 0,
    //是否有数据
    hasData:null,
    //当月是否有数据
    hasNowData:null,
    //上月是否有数据
    hasPastData:null,
    //当月数据
    nowData:null,
    //上月数据
    pastData:null
};

const getters = {
};

const actions = {

    /*
     * 邀请任务[邀请人数]
     * */
    invTk ({ commit }) {
        api.invTk(function (res) {

            res = JSON.parse(res);
            commit(types.INVTK_POST_SUCCESS, { res});
        })
    },

    /*
     * 邀请任务详情
     * */
    invTkDts ({ commit }) {

        api.invTkDts(function (res) {

            // res = [{
            //     "createTime": 1477880675000,
            //     "id": 117,
            //     "isCurrentMonth": 1,
            //     "nickName": "个15670000242",
            //     "phone": "1567000****",
            //     "recUserId": 6717,
            //     "regSource": 7,
            //     "status": 2,
            //     "userId": 2131
            // },
            // {
            //     "createTime": 1478139875000,
            //     "id": 118,
            //     "isCurrentMonth": 1,
            //     "nickName": "个15670001224",
            //     "phone": "1567000****",
            //     "recUserId": 6717,
            //     "regSource": 7,
            //     "status": 3,
            //     "userId": 3121
            // },
            //     {
            //         "createTime": 1478139875000,
            //         "id": 118,
            //         "isCurrentMonth": 0,
            //         "nickName": "个15670001224",
            //         "phone": "1567000****",
            //         "recUserId": 6717,
            //         "regSource": 7,
            //         "status": 3,
            //         "userId": 3121
            //     },
            //     {
            //         "createTime": 1478139875000,
            //         "id": 118,
            //         "isCurrentMonth": 1,
            //         "nickName": "个15670001224",
            //         "phone": "1567000****",
            //         "recUserId": 6717,
            //         "regSource": 7,
            //         "status": 3,
            //         "userId": 3121
            //     }];

            commit(types.INVTK_POST_DTS_SUCCESS, { res});
        })
    }

};

const mutations = {

    [types.INVTK_POST_SUCCESS] (state, {res}) {
        state.count = res;
    },

    [types.INVTK_POST_DTS_SUCCESS] (state, {res}) {

        // console.log(res);

        if(res == undefined || res == null || res == ""){
            state.hasData = false;
        }else{
            state.hasData = true;
            var arr1=[],arr2=[];
            for(var value of res){
                // console.log(value);
                switch (value.isCurrentMonth){
                    //当前月
                    case 1:
                        // console.log(111111);

                        arr1.push(value);
                        break;
                    case 0:
                        // console.log(2222);
                        arr2.push(value);
                        break;
                    default:
                        break;
                }
            }
            // console.log(arr1);
            // console.log(arr2);

            if(arr1.length == 0){
                state.hasNowData = false;
            }else{
                state.hasNowData = true;
                state.nowData = arr1;
            }
            if(arr2.length == 0){
                state.hasPastData = false;
            }else{
                state.hasPastData = true;
                state.pastData = arr2;
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
