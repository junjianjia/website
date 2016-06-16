//脚印图标显示、隐藏
function showpic(li){
    var pic=li.getElementsByTagName("ul")[0];
    pic.style.display="block";
}
function hidepic(li){
    var pic=li.getElementsByTagName("ul")[0];
    pic.style.display="none";
}
//轮播图
/*广告图片数组*/
var imgs=[
    {"i":0,"img":"images/banner_01.jpg"},
    {"i":1,"img":"images/banner_02.jpg"},
    {"i":2,"img":"images/banner_03.jpg"},
    {"i":3,"img":"images/banner_04.jpg"},
    {"i":4,"img":"images/banner_05.jpg"},
];
window.addEventListener("load",function(){slider.init()});
var slider={
    LIWIDTH:670,//保存每个li的宽度
    distance:0,//保存本次移动的总距离
    DURATION:1000,//本次移动总时间
    STEPS:100,//本次移动总步数
    moved:0,//保存本次移动的步数，控制动画停止
    step:0,//保存每一步的步长
    INTERVAL:0,//保存每一步的时间间隔
    timer:null,//专门用于保存当前正在播放的动画的序号，专用于停止
    WAIT:3000,//自动轮播时的等待时间
    canAuto:true,//保存是否可以自动轮播
    init:function(){
        this.INTERVAL=this.DURATION/this.STEPS;
        this.updateView();
        var me=this;
        idxs.addEventListener("mouseover",function(e){
            if(e.target.nodeName=="LI"&&e.target.className!="hover"){
                var starti=$("#idxs>.hover").html();
                var endi=e.target.html();
                me.move(endi-starti);
            }
        });
        //绑定鼠标进入事件
        $("#slider").bind("mouseover",function(){me.canAuto=false;});
        //绑定鼠标移出事件
        $("#slider").bind("mouseout",function(){me.canAuto=true;});
        //启动自动轮播
        this.autoMove();
    },
    autoMove:function(){//启动自动轮播
        var me=this;
        this.timer=setTimeout(function(){
            if(me.canAuto){
                me.move(1);
            }else{
                me.autoMove();
            }
        },this.WAIT);

    },
    move:function(n){//将imgs的ul左移或右移
        if(this.timer!=null){//有动画正在运行，就清楚当前动画
            clearTimeout(this.timer);
            this.timer=null;
            this.moved=0;
            $("#imgs").css('left','');
        }
        this.distance=n*this.LIWIDTH;
        this.step=this.distance/this.STEPS;

        //右移之前，提前调整数组内容
        if(n<0){
            var dels=imgs.splice(imgs.length+n,-n);
            Array.prototype.unshift.apply(imgs,dels);//因为unshift和push都不能打散数组
            $("#imgs").css('left',n*this.LIWIDTH+"px");
            this.updateView();
        }
        this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
    },
    moveStep:function(n){//让imgs的ul移动一部（核心）
        var left=parseFloat($("#imgs").css('left'));
        $("#imgs").css('left',left-this.step+"px");
        this.moved++;
        if(this.moved<this.STEPS){
            this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
        }else{
            clearTimeout(this.timer);
            this.timer=null;
            this.moved=0;
            var dels=imgs.splice(0,n);
            Array.prototype.push.apply(imgs,dels);
            this.updateView();
            $("#imgs").css('left','');
            this.autoMove();//再次启动自动轮播
        }
    },
    updateView:function(){//图片更新到页面
        $("#imgs").css('width',imgs.length*this.LIWIDTH+"px");
        for(var i=0,strImg="",strIdx="";i<imgs.length;i++){
            strImg+="<li><img src="+imgs[i]["img"]+"></li>";
            strIdx+="<li>"+(i+1)+"</li>";
        }
        $("#imgs").html(strImg);
        $("#idxs").html(strIdx);
        $("#idxs>li")[imgs[0].i].className="hover";

    },

}

//时光轴动画
$(function(){
    $(".diary-year").addClass("close");
    $(".diary-year").last().removeClass("close");
    $(".diary-main .diary-year .diary-list").each(function (e, target) {
        var $target=  $(target),
            $ul = $target.find("ul");
        $target.height($ul.outerHeight()), $ul.css("position", "absolute");
    });

    $(".diary-main .diary-year>.years>a").click(function (e) {
        e.preventDefault();
        $(this).parents(".diary-year").toggleClass("close")
    });
})

window.onload=function(){
    var tag=document.getElementById("tag").children;
    var content=document.getElementById("tagContent").children;
    content[0].style.display = "block";
    tag[0].className="current";
    var len= tag.length;//遍历动态集合应提前缓存length
    for(var i=0; i<len; i++){
        tag[i].index=i;
        tag[i].onclick = function(){
            for(var n=0; n<len; n++){
                tag[n].className="";
                content[n].style.display="none";
            }
            tag[this.index].className = "current";
            content[this.index].style.display = "block";
        }
    }
}
$(function(){
    $(".lifecon1 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon1 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon1 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon1 .life-pic li").eq(n-1).slideUp(100);
    })
    $(".lifecon2 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon2 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon2 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon2 .life-pic li").eq(n-1).slideUp(100);
    })
    $(".lifecon3 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon3 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon3 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon3 .life-pic li").eq(n-1).slideUp(100);
    })
    $(".lifecon4 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon4 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon4 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon4 .life-pic li").eq(n-1).slideUp(100);
    })
    $(".lifecon5 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon5 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon5 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon5 .life-pic li").eq(n-1).slideUp(100);
    })
})

//回到顶部
$(function(){
    $(window).scroll(function() {
        if($(window).scrollTop() >= 100){
            $('.totop').fadeIn(300);
        }else{
            $('.totop').fadeOut(300);
        }
    });
    $('.totop').click(function(){$('html,body').animate({scrollTop: '0px'}, 1000);});
});