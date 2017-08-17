
/***@author blue @create date 2017-2-10 @info rank.js***/

import api from '../../api/api';
import * as types from '../mutation';

const state = {
  peopleCount: 1,/*个人收益拉取第几页*/
  groupCount: 1,/*群组收益拉取第几页*/
  groupData: "",
  peopleData: "",
  dataPerson:[],
  dataGroup:[],
  own:"",
  hasData:false,/*是否有数据*/
  hasGroupData:false/*群组是否有数据*/
};

const getters = {
};

const actions = {

  /*
   * 获取个人收益排行榜
   * */
  rankPeople ({ commit }) {

    if(state.peopleCount !== -1){

      //请求的res放到 RANK_PEOPLE 里面
      api.rankPeople(function (res) {
        // console.log(res)
        res = JSON.parse(res);
        commit(types.RANK_PEOPLE, { res })
      },state.peopleCount)
    }

  },


  /*
   * 获取群主收益排行榜
   * */
  rankGroup({commit}){
    if(state.groupCount !== -1){
      // console.log("群主");

      api.rankGroup(function (res) {
        res = JSON.parse(res);
        //请求的res放到 RANK_GROUP 里面
        commit(types.RANK_GROUP, { res });
      },state.groupCount)
    }

  }

};

const mutations = {

  [types.RANK_PEOPLE] (state, { res }) {
    // console.log(res.ranks);
    if(res.ranks){
      for(let i =0 ;i < res.ranks.length;i++){
        state.dataPerson.push(res.ranks[i])
      }
      state.peopleData = state.dataPerson;
      state.peopleCount = res.pageNum;
    }else{
      state.hasData = true;
    }
    state.own = res;
  },

  [types.RANK_GROUP] (state, {res}) {
    // console.log(res.ranks);
    if(res.ranks){
      for(let i =0 ;i < res.ranks.length;i++){
        state.dataGroup.push(res.ranks[i])
      }
      state.groupData = state.dataGroup;
      state.groupCount = res.pageNum;
    }else{
      state.hasGroupData = true;
    }

  }
};

export default{
  state,
  getters,
  actions,
  mutations
}
