/***@author blue @create date 2017-4-11 @info question.js***/

$(function () {

    // scrollTo
    $.fn.scrollTo =function(options){
        var defaults = {
            toT : 0,    //滚动目标位置
            durTime : 500,  //过渡动画时间
            delay : 10,     //定时器时间
            callback:null   //回调函数
        };
        var opts = $.extend(defaults,options),
            timer = null,
            _this = this,
            curTop = $('.qu_footer').offset().top,//滚动条当前的位置
            // curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t){
                index++;
                var per = Math.round(subTop/dur);
                if(index >= dur){
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if(opts.callback && typeof opts.callback == 'function'){
                        opts.callback();
                    }
                    return;
                }else{
                    _this.scrollTop(curTop + index*per);
                }
            };
        timer = window.setInterval(function(){
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };

    // 是否参与了问卷调查
    $.ajaxMethod('post','/activity/qa/info',{
        r: new Date().getTime()
    },function(res){
        if(res.code == 200){
            switch (JSON.parse(res.data)){
                case 0:
                    $('.qu').show();
                    break;
                case 1:
                    $('.qu_no').show();
                    break;
                default:
                    break;
            }
        }
    },function(xhr){
    },function () {
    });

    // 自定义radio checkbox
    $('.custom').on('click',function () {
        if($(this).find('span').hasClass('input_active')){
            $(this).find('span').removeClass('input_active');
            $(this).removeClass('custom_active');
        }else{
            if($(this).hasClass('radio')){
                // 清洗样式
                $(this).parent().find('span').removeClass('input_active');
                $(this).find('span').addClass('input_active');

                $(this).parent().find('.custom').removeClass('custom_active');
                $(this).addClass('custom_active');
            }else if($(this).hasClass('checkbox')){
                $(this).find('span').addClass('input_active');
                $(this).addClass('custom_active');
            }else{
            }
        }
    });

    // 组装数据并发送
    $('.qu_sub').click(function(){

        var cusData = [],textData = [];
        $('.choose').each(function() {
            var sendData = [];
            var subject = $(this).attr('subject');
            $(this).find('.input_active').each(function() {
                sendData.push($(this).attr('cusVal'));
            });
            cusData.push(subject+":"+sendData);
        });
        $('.choose_text').each(function() {
            var subject = $(this).attr('subject');
            textData.push(subject+":"+$(this).find('textarea').val());
        });

        $.ajaxMethod('post','/activity/qa/submit',{
            choices: cusData,
            texts: textData
        },function(res){
            $('.choose_active').removeClass('choose_active');

            if(res.code == 200){
                // 刷新当前页状态
                history.go(0);
            }else if(res.code == 816){
                console.log($('.h'+res.data).offset().top);
                $("html,body").scrollTo({toT:$('.h'+res.data).offset().top-20});
                $('.h'+res.data).addClass('choose_active');
            }
        },function(xhr){
        },function () {
        });

    });
});