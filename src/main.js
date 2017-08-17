/***@author blue @create date 2017-4-05 @info main.js***/

import Vue from 'vue'

// 引入router/store/filter/directive
import router from './router/router'
import store from './store/store'
import filter from './filter/filter'
import directive from './directive/directive'

// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

// 开启规则弹框
window.test_open = function () {
    store.dispatch('openPopUp');
};
// 关闭规则弹框
window.test_cls = function () {
    store.dispatch('clsPopUp');
};

// 创建一个app实例，并且挂载到选择符#app匹配的元素上
new Vue({router,store}).$mount('#app');


