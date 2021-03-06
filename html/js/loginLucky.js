/**
 * Created by Administrator on 2016/6/20.
 */
(function($){
    //判断是否在倒计时（0-否/1-是）
    var isCon = 0;
    //判断是否为特殊号码(2-否(调用正常验证码接口)/1-是(调用语音接口))
    var specialNo = 0;
    //点击领取
    $('.get_invite').on('click',function(){
        if($(this).hasClass('disabledBtn')) return false;
          $(this).addClass('disabledBtn');
            var terminal = 0,phone = $("#phone").val();
            //判断访问终端
            if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                terminal = 0
            }
            else if(navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1){
                terminal = 1
            }
            $.ajaxMethod('post','/register/rec/phone',{
                phone:phone,
                randomNum:$('#identifying_code').val(),
                recUserId:$.getUrlParam('userId'),
                regSource:eval($.getUrlParam("newType"))?7:6, //添加是否是新版本的，是为7 不是为6;
                terminal:terminal
            },function(res){

                switch (res.code){
                    case 200:
                        sessionStorage.setItem("phone",phone);
                        $("#phone").val("");
                        $("#identifying_code").val("");
                        window.location.href = './loginLuckyIn.html?phone='+phone;
                        break;
                    case 123:
                        $.alert('验证码错误', '提示');break;
                    case 114:
                        $.alert('该手机号已被注册', '提示');break;
                    case 400:
                        $('.get_invite').removeClass('disabledBtn');
                        $.alert('该手机号无法注册', '提示');
                        break;
                }

            },function(xhr){
                $.alert('网络繁忙','提示');
            },function () {
            })

    });
    //获取验证码
    $('.send_invite').on('click',function(){
        if($(this).attr('class') == 'send_invite'){
            $('.send_invite').addClass('disabled');
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
                        isCon = 1;
                        var countDown = setInterval(function(){
                            countDownT --;
                            $('.send_invite').html(countDownT);
                            if(countDownT<=0){
                                $('.send_invite').removeClass('disabled');
                                $('.send_invite').html('获取');
                                clearInterval(countDown);
                                isCon = 0;
                            }
                        },1000)
                    }
                    else{
                        $('.send_invite').removeClass('disabled');
                        $.alert(res.msg || "网络繁忙", '提示');
                    }

                },
                error:function(xhr, ajaxOptions, thrownError){
                    $('.send_invite').removeClass('disabled');
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
                $('.get_invite').removeClass('disabledBtn')
            }
            else{
                $('.get_invite').addClass('disabledBtn')
            }
        }
        else{
            $('.code_point').addClass('vi_hidden');
            $('.send_invite').addClass('disabled');
            $('.get_invite').addClass('disabledBtn');
        }
    }
    //验证验证码函数
    function testCode(ph,code){
        var regPh =  /^1[3-9]\d{9}$/;
        var regCode = /^[0-9]{4,6}$/;
        if(regPh.test(ph) && regCode.test(code)){
            $('.get_invite').removeClass('disabledBtn')
        }
        else{
            $('.get_invite').addClass('disabledBtn')
        }
    }

})(Zepto);