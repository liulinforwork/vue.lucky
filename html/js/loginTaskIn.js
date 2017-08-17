/***@author blue @create date 2017-2-08 @info loginTaskIn.js***/

(function($,w){

    var resize = function () {
        function a() {
            $('.p_box').css('height',$(w).get(0).innerHeight);
        }
        a();
        $(w).resize(a);
    };

    function init() {
        resize();
    }
    init();


    var phone = $.getUrlParam('phone');
    try{
        if(!sessionStorage.getItem("phone")){
            if(/^\d{11}$/.test(phone)){
                $('#phone').html(phone);
                $('#pwd').html(phone.substring(5,11));
            }
        }else{
            phone = sessionStorage.getItem("phone");
            $('#phone').html(phone);
            $('#pwd').html(phone.substring(5,11));
        }

    }catch(e){
        console.log(e);
    }
    $('.p_btn1').on('click',function(){
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.mar.ui'
    });

})(Zepto,window,undefined);