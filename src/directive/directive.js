/***@author blue @create date 2017-4-05 @info directive.js***/

import Vue from 'vue'

// 页面title
Vue.directive('title', {
    inserted: function (el, binding) {
        // console.log(el);
        document.title = el.dataset.title
    }
});
