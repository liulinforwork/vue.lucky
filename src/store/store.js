
/***@author blue @create date 2017-3-27 @info store.js***/

import Vue from 'vue';
import Vuex from 'vuex';
import comm from './modules/comm';
import index from './modules/index';
import rank from './modules/rank';
import read from './modules/read';
import invite from './modules/invite';
import fire from './modules/fire';
import invTk from './modules/invTk';
import redeem from './modules/redeem';
// import plugins from './plugins';
// import createLogger from 'vuex/dist/logger'


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        comm,
        index,
        rank,
        read,
        invite,
        fire,
        invTk,
        redeem
    },
    strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
    // plugins: [createLogger(),plugins.showLogs]
    // plugins: [createLogger()]
});


export default store
