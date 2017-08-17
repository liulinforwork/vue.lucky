/***@author blue @create date 2017-4-05 @info filter.js***/

import Vue from 'vue'

// 过滤器
Vue.filter('uppercase', function(value) {
    if (!value) { return ''}
    value = value.toString()+"这是说明啊";
    return value.charAt(0).toUpperCase() + value.slice(1)
});

// 时间戳转化成时间
Vue.filter('time', function (time) {
    var time = parseInt(time/1000);
    var hour = parseInt(time/3600);
    var min = parseInt((time%3600)/60);
    var sec = parseInt(time%3600%60);
    // console.log(hour+"hour:"+min+"min:"+sec+"sec");
    return (hour/10>=1? hour:'0'+hour) + "："+(min/10>=1? min:'0'+min) + "：" + (sec/10>=1? sec:'0'+sec)+"";
});

// 字符串截取后6位
Vue.filter('substr', function (str) {
    return str = str.match(/.{6}$/)[0];
});

// 时间显示
Vue.filter('getData', function (timeData) {
    var date = new Date(timeData);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate()<10 ? '0' + (date.getDate()) : date.getDate() + '');
    return Y+M+D
});

// 显示不同状态
Vue.filter('tkDts', function (st) {
    let str;
    switch (st){
        case 1:
            str = "已邀请";
            break;
        case 2:
            str = "已成功邀请";
            break;
        case 3:
            str = "邀请失败";
            break;
    }
    return str
});
