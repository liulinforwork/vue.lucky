/*@author blue @create date 2017-02-27 @info posterShare.js*/

(function($){
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    // link.href = "../css/load.css";
    head.appendChild(link);
    var h = "<div class=\"downlink\" id=\"closeBox\">"
        +"<a href=\"https://m.makeba.com\" class=\"down_logo\"><img src=\"https://share.makeba.com/img/down_logo.png\"></a>"
        +"<a class=\"down_load\"><img src=\"https://share.makeba.com/img/download.png\" alt=\"下载市场\"></a>"
        +"<a class=\"close\"><img src=\"https://share.makeba.com/img/close.png\"></a>"
        +"</div>";
    $("body").append(h);

    $(document).on("click",".down_load",function(){
        window.open("http://boss.makeba.com/official/download.html?flag=1&source=1");
    });

    $(document).on("click",".close",function(){
        $("#closeBox").remove();
    })
})(Zepto);