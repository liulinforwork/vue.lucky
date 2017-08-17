/***@author blue @create date 2017-2-10 @info common.js***/

/***@author blue @create date 2017-2-10 @info 接口地址***/
var portUrl = /^pre/.test(location.host)?"https://preapp.madrock.com.cn":
    /^h5/.test(location.host)?"https://appserver.madrock.com.cn":"http://test.appserver.com";
var portUrl2 = /^pre/.test(location.host)?"https://preh5.makeba.com.cn":
    /^h5/.test(location.host)?"https://h5.makeba.com":"http://test.h5.com";

/***@author blue @create date 2017-2-10 @info 获取地址栏参数***/
$.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) {
        return unescape(r[2]);
    }
    return null;
};

/***@author blue @create date 2017-2-10 @info configure***/
var conf = {
    //版本
    Edition :  '1.5.7',
    //判断访问终端
    terminal: function () {
        var a;
        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            a = 0
        }
        else if(navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1){
            a = 1
        }
        return a;
    },
    //公共参数
    afterLogin:function(para){
        var timestamp = new Date().getTime(),
            userId = $.getUrlParam("userId"),
            pim = $.getUrlParam("pim");
        var sign = hex_md5("userId="+userId+"&timestamp="+timestamp);
        var obj = {
            userId:userId,
            timestamp:timestamp,
            sign:sign,
            para:JSON.stringify(para),
            version: conf.Edition,
            terminal:conf.terminal(),
            pim:pim,
            h5:0
        };
        return obj;
    }
};

/***@author blue @create date 2017-2-10 @info ajaxMethod***/
$.ajaxMethod = function(method,url,para,successFun,errorFun,completeFun){
    $.ajax({
        url:portUrl+url,
        data:conf.afterLogin(para),
        type:method,
        success:function(res){
            successFun(res);
        },
        error:function(xhr){
            errorFun(xhr);
        },
        complete: function () {
            completeFun();
        }
    });
    $(".sk-circle").hide();
};
// /***@author blue @create date 2017-2-10 @info ajaxMethods***/
// $.ajaxMethods = function(o){
//     $.ajax({
//         url:o.url,
//         type:o.method?o.method:"get",
//         data:o.data?conf.afterLogin(o.data):"",
//         dataType:o.dataType?o.dataType:"json",
//         async:o.async?o.async:true,
//         xhrFields:{
//             withCredentials:o.cors?o.cors:true,
//         },
//         success:function(res){
//             o.correct(res);
//         },
//         error:function(xhr){
//             console.log(xhr);
//             o.error(xhr);
//         }
//     })
// }

/***@author blue @create date 2017-2-10 @info error***/
function error(mark,code){
    if(mark == 1){
        window.makeba.logout(code);
    }else if(mark == 0){
        window.webkit.messageHandlers.loginError.postMessage(code);
    }
}

/***@author blue @create date 2017-2-10 @info getTime***/
function getTime(timeDifference){
    var time = timeDifference/1000;
    var hour = parseInt(time/3600);
    var min = parseInt((time%3600)/60);
    var sec = parseInt(time%3600%60);
    // console.log('剩余：' + hour+':'+min+':'+sec);
    $('.time_hour').html(hour/10>=1? hour:'0'+hour);
    $('.time_minute').html(min/10>=1? min:'0'+min);
    $('.time_second').html(sec/10>=1? sec:'0'+sec);
}

/***@author blue @create date 2017-2-10 @info _share***/
/***
 * act_new1页面
 * newType true task
 * newType false task
 */
function _share(a,b,c) {
    if(b){
        /***andriod***/
        if(a == 'task'){

            var taskUrlAnd = portUrl2+'/lucky/html/loginTask.html?userId='+$.getUrlParam('userId')+'&newType=true';
            console.log(taskUrlAnd);
            window.makeba.shareChaining(portUrl2+'/lucky/images/common/logo.png',
                'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',taskUrlAnd);
        }else if(a == 'act'){

            var actUrlAnd = portUrl2+'/lucky/html/loginLucky.html?userId='+$.getUrlParam('userId')+'&newType=false';
            console.log(actUrlAnd);
            window.makeba.shareChaining(portUrl2+'/lucky/images/common/logo.png',
                'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',actUrlAnd);
        }else if(a == 'redeem'){

            var redeemUrlAnd = portUrl2 + '/lucky/html/loginTask.html?userId='+$.getUrlParam('userId')+'&newType=false'+"&redeemTrans="+c;
            console.log(redeemUrlAnd);
            window.makeba.shareChaining(portUrl2+'/lucky/images/common/logo.png',
                'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',redeemUrlAnd);
        }else if(a == 'poster'){

            var posterUrlAnd= portUrl2+'/lucky/html/posterShare.html';
            console.log(posterUrlAnd);
            window.makeba.shareChaining(portUrl2+'/lucky/images/poster/pt-img.jpg',
                '马克巴比基尼日活动，满满福利享不停','',posterUrlAnd);
        }
    }else{
        /***ios***/
        if(a == 'task'){

            var taskUrlIos = portUrl2+'/lucky/html/loginTask.html?userId='+$.getUrlParam('userId')+'&newType=true';
            console.log(taskUrlIos);
            window.webkit.messageHandlers.click.postMessage([portUrl2+'/lucky/images/common/logo.png',
                'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',taskUrlIos]);
        }else if(a == 'act'){

            var actUrlIos = portUrl2+'/lucky/html/loginLucky.html?userId='+$.getUrlParam('userId')+'&newType=false';
            console.log(actUrlIos);
            window.webkit.messageHandlers.click.postMessage([portUrl2+'/lucky/images/common/logo.png',
                'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',actUrlIos]);
        }else if(a == 'redeem'){

            var redeemUrlIos = portUrl2+'/lucky/html/loginTask.html?userId='+$.getUrlParam('userId')+'&newType=false'+"&redeemTrans="+c;
            console.log(redeemUrlIos);
            window.webkit.messageHandlers.click.postMessage([portUrl2+'/lucky/images/common/logo.png',
                'Hi 朋友，送你7天被钱砸的体验','我在用马克巴，注册就能被钱砸！天天都挣打车费，顿顿都吃霸王餐！',redeemUrlIos]);
        }else if(a == 'poster'){

            var posterUrlIos= portUrl2+'/lucky/html/posterShare.html';
            console.log(posterUrlIos);
            window.webkit.messageHandlers.click.postMessage([portUrl2+'/lucky/images/poster/pt-img.jpg','' +
            '马克巴比基尼日活动，满满福利享不停','',posterUrlIos]);
        }
    }
}


/***@author blue @create date 2017-2-10 @info showRight***/
function showRight(mark,code) {
    try{
        if(mark == 1){
            //安卓
            window.makeba.isShowRight(code);
        }else if(mark == 0){
            //ios
            window.webkit.messageHandlers.isShowRightByIos.postMessage(code);
        }
    }catch (e){
    }
}

/***@author blue @create date 2017-2-10 @info helpMdContent***/
$('.rule_ly').html([' <div class="help">',
    '            <h1 class="help_tl">',
    '                <img src="../images/common/help-bg.png" alt="图片加载失败">',
    '            </h1>',
    '        </div>',
    '        <div class="help_mk"></div>'].join(""));

/***@author blue @create date 2017-2-10 @info helpMd***/
function helpMd() {
    //生成弹框
    $('.rule_ly').html([' <div class="help">',
        '            <h1 class="help_tl">',
        '                <img src="../images/common/help-bg.png" alt="图片加载失败">',
        '            </h1>',
        '            <div class="help_txt">' +
        '            <div class="help_wp">',
        '                <h1>规则说明</h1>',
        '                <p>',
        '                    <span>',
        '                        <img src="../images/common/help-spot.png" alt="图片加载失败">',
        '                    </span>',
        '                    新注册的用户，拥有7天的测试项目打卡时间，在此期间，无法参加【速闻阅读】和【邀新赚信用】活动。</p>',
        '                <p>',
        '                     <span>',
        '                        <img src="../images/common/help-spot.png" alt="图片加载失败">',
        '                    </span>',
        '                    测试项目打卡资格时间不叠加。</p>',
        '                <p>',
        '                     <span>',
        '                        <img src="../images/common/help-spot.png" alt="图片加载失败">',
        '                    </span>',
        '                    如果用户同时开启多个活动，测试项目打卡的计算时间，按照最晚开启活动的时间计算。</p>' +
        '            </div>',
        '            </div>',
        '            <div class="help_cls" onclick="helpCls()">',
        '                <img src="../images/common/help-close.png" alt="图片加载失败">',
        '            </div>',
        '        </div>',
        '        <div class="help_mk"></div>'].join(""));
    $('.rule_ly').show();
    $('.help_mk').show();

    $('body').css('overflow','hidden');
}

/***@author blue @create date 2017-2-10 @info helpCls***/
function helpCls() {
    $('.help_mk').hide();
    $('.rule_ly').hide();
    $('body').css('overflow','initial');
}