/***@author blue @create date 2017-4-05 @info util.js***/

import api from './../api/api'
// import $ from 'n-zepto'

//接口
let port = /^pre/.test(location.host)
  ?"https://preapp.madrock.com.cn":/^h5/.test(location.host)
  ?"https://appserver.madrock.com.cn":"http://test.appserver.com";
//域名
// let url = /^pre/.test(location.host)
//   ?"https://preh5.madrock.com.cn":/^h5/.test(location.host)
//   ?"https://h5.makeba.com":"http://test.h5.com";
let url = "http//www.es6in.com";
let CONF = {

  //版本号
  edition: "1.5.8",

  //获取地址栏参数
  getUrlParam:function (name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r!=null) {
      return unescape(r[2]);
    }
    return null;
  },

  //判断设备Ios or Android
  terminal: function () {
    let a;
    if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
      a = 0
    }
    else if(navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1){
      a = 1
    }
    return a;
  }
};

export default {

    inviteUser:function (cb,share,c) {

        let a = share.type,b = CONF.terminal();

        if(b){
            /***andriod***/
            if(a == 'task'){

                var taskUrlAnd = url+'/lucky/html/loginTask.html?userId='+CONF.getUrlParam('userId')+'&newType=true';
                console.log(taskUrlAnd);
                window.makeba.shareChaining(url+'/lucky/html/images/common/logo.png',
                    'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',taskUrlAnd);
            }else if(a == 'act'){

                var actUrlAnd = url+'/lucky/html/loginLucky.html?userId='+CONF.getUrlParam('userId')+'&newType=false';
                console.log(actUrlAnd);
                window.makeba.shareChaining(url+'/lucky/html/images/common/logo.png',
                    'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',actUrlAnd);
            }else if(a == 'redeem'){

                var redeemUrlAnd = url + '/lucky/html/loginTask.html?userId='+CONF.getUrlParam('userId')+'&newType=false'+"&redeemTrans="+c;
                console.log(redeemUrlAnd);
                window.makeba.shareChaining(url+'/lucky/html/images/common/logo.png',
                    'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',redeemUrlAnd);
            }else if(a == 'poster'){

                var posterUrlAnd= url+'/lucky/html/posterShare.html';
                console.log(posterUrlAnd);
                window.makeba.shareChaining(url+'/lucky/html/images/poster/pt-img.jpg',
                    '马克巴比基尼日活动，满满福利享不停','',posterUrlAnd);
            }
        }else{
            /***ios***/
            if(a == 'task'){

                var taskUrlIos = url+'/lucky/html/loginTask.html?userId='+CONF.getUrlParam('userId')+'&newType=true';
                console.log(taskUrlIos);
                window.webkit.messageHandlers.click.postMessage([url+'/lucky/images/common/logo.png',
                    'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',taskUrlIos]);
            }else if(a == 'act'){

                var actUrlIos = url+'/lucky/html/loginLucky.html?userId='+CONF.getUrlParam('userId')+'&newType=false';
                console.log(actUrlIos);
                window.webkit.messageHandlers.click.postMessage([url+'/lucky/images/common/logo.png',
                    'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',actUrlIos]);
            }else if(a == 'redeem'){

                var redeemUrlIos = url+'/lucky/html/loginTask.html?userId='+CONF.getUrlParam('userId')+'&newType=false'+"&redeemTrans="+c;
                console.log(redeemUrlIos);
                window.webkit.messageHandlers.click.postMessage([url+'/lucky/images/common/logo.png',
                    'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',redeemUrlIos]);
            }else if(a == 'poster'){

                var posterUrlIos= url+'/lucky/html/posterShare.html';
                console.log(posterUrlIos);
                window.webkit.messageHandlers.click.postMessage([url+'/lucky/images/poster/pt-img.jpg','' +
                '马克巴比基尼日活动，满满福利享不停','',posterUrlIos]);
            }
        }
    },

    indexBanner:function () {
        api.indexBanner(function(res){

            $('banner').banner(res);
        })
    }

}

