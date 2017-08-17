/***@author blue @create date 2017-2-08 @info loginTask.js***/

(function ($,w,undefined) {

    //头像及用户名
    $.ajaxMethod('post','/register/rec/user',{
        recUserId:$.getUrlParam('userId')
    },function(res){
        if(res.code == 200){
            if(res.data){
                $('.o_info span').html(res.data.nickName);
                $('.o_title img').attr('src',res.data.headImg + '?imageView2/1/w/100/h/100');
            }
        }
    },function(xhr){
    },function () {
    });

    var resize = function () {
        function a() {
            $('.o_box').css('height',$(w).get(0).innerHeight);
        }
        a();
        $(w).resize(a);
    };

    function init() {
        resize();
    }
    init();

    //判断是否在倒计时（0-否/1-是）
    var isCon = false;
    //判断是否为特殊号码(2-否(调用正常验证码接口)/1-是(调用语音接口))
    var specialNo = 0;

    //点击领取
    $('.o_link1').on('click',function(){

        if($(this).hasClass('o_link1_act')) return false;
        $(this).addClass('o_link1_act');

        //判断访问终端 获取电话号码
        var terminal = conf.terminal(),phone = $("#phone").val();


        $.ajaxMethod('post','/register/rec/phone',{
            phone:phone,
            randomNum:$('#identifying_code').val(),
            recUserId:$.getUrlParam('userId'),
            regSource:eval($.getUrlParam("newType"))?7:9, //  7邀新任务     9马币赎回
            redeemTrans:$.getUrlParam('redeemTrans'),
            terminal:terminal
        },function(res){

            switch (res.code){
                case 200:
                    sessionStorage.setItem("phone",phone);
                    $("#phone").val("");
                    $("#identifying_code").val("");
                    window.location.href = './loginTaskIn.html?phone='+phone;
                    break;
                case 123:
                    $.alert('验证码错误', '提示');break;
                case 114:
                    $.alert('该手机号已被注册', '提示');break;
                case 400:
                    $('.o_link1').removeClass('o_link1_act');
                    $.alert('该手机号无法注册', '提示');
                    break;
            }
        },function(xhr){
            $.alert('网络繁忙','提示');
        },function () {
        })

    });

    //获取验证码
    $('.o_idCode').on('click',function(){
        if($(this).attr('class') == 'o_idCode'){

            $('.o_idCode').addClass('disabled');
            var url = portUrl+'/sms/sendCode';
            //如果specialNo=1调语音接口
            if(specialNo == 1){
                url = portUrl+'/sms/sendVoiceCode';
            }
            var ph = $('#phone').val();
            var timestamp = new Date().getTime();
            var sign = encrypt(hex_md5(url+'?phone='+ph.substr(0,3)+ph.substr(7,4)),timestamp.toString());
            $.ajax({
                type:'post',
                url:url,
                data:{
                    phone:$('#phone').val(),
                    timestamp:timestamp,
                    sign:sign
                },
                success:function(res){
                    if(res.code == 200){

                        var countDownT = 59;
                        //倒计时
                        var countDown = setInterval(function(){
                            countDownT --;
                            $('.o_idCode').html(countDownT);
                            if(countDownT<=0){
                                $('.o_idCode').removeClass('disabled');
                                $('.o_idCode').html('获取');
                                clearInterval(countDown);
                                isCon = 0;
                            }
                        },1000)
                    }
                    else{
                        $('.o_idCode').removeClass('disabled');
                        $.alert(res.msg || "网络繁忙", '提示');
                    }
                },
                error:function(xhr, ajaxOptions, thrownError){
                    $('.o_idCode').removeClass('disabled');
                    $.alert("网络繁忙","提示");
                }
            })
        }
    });

    //进入网页验证
    testCode($('#phone').val(),$('#identifying_code').val());

    //验证手机
    $('#phone').on('input propertychange',function(){
        testPhone($(this).val(),$('#identifying_code').val());
    });
    //验证验证码
    $('#identifying_code').on('input propertychange',function(){
        testCode($('#phone').val(),$(this).val());
    });
    //验证手机函数
    function testPhone(ph,code){
        var regPh = /^1[3-9]\d{9}$/;
        var regCode = /^[0-9]{4,6}$/;

        if(regPh.test(ph) && !isCon){


            //判断手机是否已注册
            $.get(portUrl+'/register/isReg?phone='+ph,function(res){
                if(res.status == 0){
                    specialNo = res.regVerifyMode;
                    $('.send_invite').removeClass('disabled');
                    if(specialNo == 0 || specialNo == 2){
                        $('.code_point').addClass('vi_hidden');
                    }
                    else{
                        $('.code_point').addClass('vi_visible')
                    }
                }
                else{
                    $.alert('手机号已注册', '提示');
                }
            });

            if(regPh.test(ph) && regCode.test(code)){
                $('.o_link1').removeClass('o_link1_act');
            }
            else{
                $('.o_link1').addClass('o_link1_act');
            }
        }
        else{

            $('.o_link1').addClass('disabled');
            $('.o_link1').addClass('o_link1_act');
        }
    }

    //验证验证码函数
    function testCode(ph,code){
        var regPh = /^1[3-9]\d{9}$/;
        var regCode = /^[0-9]{4,6}$/;
        if(regPh.test(ph) && regCode.test(code)){
            $('.o_link1').removeClass('o_link1_act')
        }
        else{
            $('.o_link1').addClass('o_link1_act')
        }
    }

})(Zepto,window);