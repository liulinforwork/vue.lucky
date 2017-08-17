/**
 * Created by Administrator on 2016/8/25.
 */
(function(){
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
    $('.get_invite').on('click',function(){
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.mar.ui'
    });
    function is_weixn() {
        var ua = navigator.userAgent.toLowerCase();
        // $('#is_wx').html(navigator.userAgent);
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            // $('#is_wx').html("微信打开");
            return true;
        } else {
            return false;
        }
    }
})(Zepto);