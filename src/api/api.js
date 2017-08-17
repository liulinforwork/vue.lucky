/***@author blue @create date 2017-4-05 @info api.js***/

import axios from 'axios';
import md5 from 'md5';
import qs from 'querystring';

// 接口
let port = /^pre/.test(location.host)
    ?"https://preapp.madrock.com.cn":/^h5/.test(location.host)
    ?"https://appserver.madrock.com.cn":"http://test.appserver.com";
// 域名
let url = /^pre/.test(location.host)
    ?"https://preh5.makeba.com":/^h5/.test(location.host)
    ?"https://h5.makeba.com":"http://test.h5.com";
// 接口配置
let CONF = {
    // 版本号
    edition: "1.5.8",

    // 获取地址栏参数
    getUrlParam:function (name) {
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r!=null) {
            return unescape(r[2]);
        }
        return null;
    },

    // 判断设备Ios or Android
    terminal: function () {
        let a;
        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            a = 0
        }
        else if(navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1){
            a = 1
        }
        return a;
    },

    // 通用参数
    afterLogin:function (para) {
        let timestamp = new Date().getTime(),
            userId = CONF.getUrlParam("userId"),
            pim = CONF.getUrlParam("pim"),
            sign = md5("userId="+userId+"&timestamp="+timestamp);
        let para_add = {
            userId:userId,
            timestamp:timestamp,
            sign:sign,
            para:JSON.stringify(para),
            version: CONF.edition,
            terminal:CONF.terminal(),
            pim:pim,
            h5:0
        };
        return para_add;
    }
};

export default {

    /*
     * 获取首页截止时间
     * */
    indexGetTime: function (cb) {

        axios.get(port + '/activity/getSingEndTime', {
            params: CONF.afterLogin({
                userId: CONF.getUrlParam('userId'),
                coordinate: JSON.parse(CONF.getUrlParam('coordinate'))
            })
        }).then(function (res) {
            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 获取个人收益排行榜
     * */
    rankPeople: function (cb,pageNum) {

        axios.post(port + '/activity/wallet/people',
            qs.stringify(CONF.afterLogin({
                userId: CONF.getUrlParam('userId'),
                pageNum: pageNum
            }))
        ).then(function (res) {
            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 获取群主收益排行榜
     * */
    rankGroup: function (cb,pageNum) {

        axios.post(port + '/activity/wallet/group',
            qs.stringify(CONF.afterLogin({
                userId: CONF.getUrlParam('userId'),
                pageNum: pageNum
            }))
        ).then(function (res) {
            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 速闻阅读相关信息
     * */
    readInfo: function (cb) {

        axios.get(port + '/activity/getAdReadingConfig', {
            params: CONF.afterLogin({
                userId: CONF.getUrlParam('userId')
            })
        }).then(function (res) {
            if (res.data.code == 200) {
                cb(res.data.data,res.data.code);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 开启速闻阅读活动
     * */
    readOpen: function (cb) {

        axios.get(port + '/activity/open/ad/reading', {
            params: CONF.afterLogin({
                userId: CONF.getUrlParam('userId')
            })
        }).then(function (res) {

            if (res.data.code == 200) {
                cb(res.data.msg);
            }else if(res.data.code == 108){
                console.log(res.data.msg);
            }

        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 邀新活动相关信息
     * */
    inviteInfo: function (cb) {

        axios.post(port + '/activity/luckyWheel/view',
            qs.stringify(CONF.afterLogin({
                userId: CONF.getUrlParam('userId')
            }))
        ).then(function (res) {
            cb(res.data.data,res.data.code);
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 开启邀新活动
     * */
    inviteOpen: function (cb) {

        axios.post(port + '/activity/luckyWheel/create',
            qs.stringify(CONF.afterLogin({
                userId: CONF.getUrlParam('userId')
            }))
        ).then(function (res) {

            if (res.data.code == 200) {
                cb(res.data.msg);
            }else if(res.data.code == 108){
                console.log(res.data.msg);
            }else if(res.data.code == 113){
                console.log(res.data.msg);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * fire中 判断用户为新用户/老用户
     * */
    fireNew: function (cb) {

        axios.post(port + '/activity/sweepStore/view',
            qs.stringify(CONF.afterLogin({
                r: new Date().getTime()
            }))
        ).then(function (res) {

            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(1)
            console.log(err);
        });
    },

    /*
     * 获取邀请人信息
     * */
    inviteUser: function (cb) {

        axios.post(port + '/register/rec/user',
            qs.stringify(CONF.afterLogin({
                userId: CONF.getUrlParam('userId')
            }))
        ).then(function (res) {
            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 动态banner图获取
     * */
    indexBanner: function (cb) {

        axios.post(port + '/activity/luckyWheel/carousel/view',
            qs.stringify(CONF.afterLogin({}))
        ).then(function (res) {
            if (res.data.code == 200) {
                cb(res.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 邀请任务[邀请人数]
     * */
    invTk: function (cb) {

        axios.post(port + '/activity/invitation/view',
            qs.stringify(CONF.afterLogin({
                partyType:'1'
            }))
        ).then(function (res) {

            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 邀请任务[邀请详情]
     * */
    invTkDts: function (cb) {

        axios.post(port + '/activity/invitation/detail/view',
            qs.stringify(CONF.afterLogin({
                r: new Date().getTime()
            }))
        ).then(function (res) {
            // console.log(res);
            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 马币赎回[拉取后台加密]
     * */
    redeemMd5: function (cb) {

        axios.post(port + '/activity/redeem/view',
            qs.stringify(CONF.afterLogin({
                r: new Date().getTime()
            }))
        ).then(function (res) {
            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },

    /*
     * 马币赎回[邀请详情]
     * */
    redeemDts: function (cb) {

        axios.post(port + '/activity/redeem/detail/view',
            qs.stringify(CONF.afterLogin({
                r: new Date().getTime()
            }))
        ).then(function (res) {
            if (res.data.code == 200) {
                cb(res.data.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    }

}
