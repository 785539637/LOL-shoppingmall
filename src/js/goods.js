$(function () {

    // 微信二维码
    $('.chat_mall').on({
        'mouseover':function () {
            $('.chat_code').css('display','block');
        },
        'mouseout':function () {
            $('.chat_code').css('display','none');
        }
    })

    // 导航列表
    $('.nav_list').on({
        'mouseover':function () {
            $(this).children().css('display','block');
        },
        'mouseout':function () {
            $(this).children('div').css('display','none');
        }
    })

    // 搜索列表
    $('.search').on({
        'focus':function () {
            $('.keyword_box').css('display','block');
        },
        'blur':function () {
            $('.keyword_box').css('display','none');
        }
    })

    // 联系客服
    $('.service-box').on({
        'mouseover':function () {
            $('.service_icon').css('background-position','-47px -2px') ,
            $('.service').css('background','black'),
            $('.service').children('span').css('color','white') 
        },
        'mouseout':function () {
            $('.service_icon').css('background-position','-2px -2px') ,
            $('.service').css('background','#fff'),
            $('.service').children('span').css('color','#626262') 
        },
        'click':function () {
            window.open('turning.html');
        }
    })

    
    // 获取本地数据code
    var codeArr = JSON.parse(localStorage.getItem('goods')).code;
    

    // 加载数据
        $.ajax({
            type : 'get',
            url  : '../static/data/goods.json',
            cache : false,
            dataType : 'json',
            success : function (jsonArr) {
                var res = '';
                $.each(codeArr,function (i,code) {//遍历codeArr
                    $.each(jsonArr,function (index,item) {//遍历jsonArr
                        if (code == item.code) {//匹配对应的code
                            res += `<div class="wrap" code="${item.code}">
                            <div class="min-box fl">
                                <img src="${item.imgUrl}" alt="">
                                <p class="mask"></p>
                            </div>
                            <div class="max-box">
                                <img src="${item.imgUrl}" alt="">
                            </div>
                            <div class="details fr">
                                <div class="detail_box">
                                    <div class="detail-top">
                                        <h3>${item.title}</h3>
                                    </div>
                                    <div class="detail-nav">预计11月中旬陆续发货</div>
                                    <div class="detail-center">
                                        <div class="line"></div>
                                        <div class="price-box">
                                            <span class="price-left">全款：</span>
                                            <span class="price-right">
                                                <span class="symbol"></span>${item.price}
                                            </span>
                                        </div>
                                        <div class="presell-box">
                                            <i class="ico-sell"></i>
                                            <span class="presell fl">预售</span>
                                            <i class="ico-dai"></i>
                                            <span class="preselled fl">已预售
                                                <span class="presell">1325</span>
                                                件</span>
                                            <i class="ico-clock"></i>
                                            <span class="fl">预售剩余
                                                <span class="presell clock"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="volume">
                                        <span>最近销量1327</span>
                                    </div>
                                    <div class="select">
                                        <div class="selection">
                                            <span class="words">规格：</span>
                                            <span class="selected s1">
                                                <ul>
                                                    <li><a class="click">限定版</a></li>
                                                    <li><a class="">标准版</a></li>
                                                </ul>
                                            </span>
                                        </div>
                                        <div class="selection">
                                            <span class="words">颜色：</span>
                                            <span class="selected">
                                                <ul>
                                                    <li><a class="click">彩色</a></li>
                                                </ul>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="add">加入购物车</div>
                                    <a href="cart.html">我的购物车 GO!</a>
                                </div>
                            </div>
                        </div>`;
                        };
                    });
                });
                $('.main').html(res);
            }
        });


    if (localStorage.getItem('goods')){//判断本地存储是否有商品
        localStorage.clear();//清空本地数据
    }

    // 选择规格
    $('.main').on('click','.s1 li a',function () { 
        console.log($(this));
         
        $(this).addClass('click').parent().siblings().children().removeClass('click');
    })

    // 添加购物车
    $('.main').on('click','.details .add',function () {

        var code = $(this).parents('.wrap').attr('code');//获取点击商品的编号
        
        if (localStorage.getItem('goods')) {//判断本地存储是否有加入购物车的商品
            var codeArr = JSON.parse(localStorage.getItem('goods')).code;
        } else {
            var codeArr = [];
        };

        codeArr.push(code);//将点击商品的编号添加到商品编号数组中

        $('.cart_num').html(codeArr.length);

        var jsonStr = JSON.stringify({"code":codeArr});//将获取到的商品编号转为json字符串

        localStorage.setItem('goods',jsonStr);//存储到本地数据

        alert('添加成功!赶快去我的购物车看看吧~');
    });





// 放大镜
function Magnifier() {

    // 获取元素到body的左侧或顶部的距离
    function offset(dom){
        var l = 0, t = 0;
        var bdl = dom.clientLeft;//左边框
        var bdt = dom.clientTop;//上边框
        while (dom) {
            l = l + dom.offsetLeft + dom.clientLeft;
            t = t + dom.offsetTop + dom.clientTop;
            dom = dom.offsetParent;//每次循环后，让此元素等于它的定位父级
        }
        return {left: l-bdl, top: t-bdt};
    }
    
    // 1.鼠标进入左边的小图，蒙板显示，右边大图显示
    $('body').on('mouseenter','.min-box',function (){
        $('.mask').css('display','block');
        $('.max-box').css('display','block');
    });

    // 2.鼠标移出左边的小图，蒙板隐藏，右边大图隐藏
    $('body').on('mouseleave','.min-box',function (){
        $('.mask').css('display','none');
        $('.max-box').css('display','none');
    });

    // 3.鼠标在小图内移动，蒙板跟随鼠标移动，大图反向移动（负值）
    $('body').on('mousemove','.min-box',function (ev){
        var e = ev || event;
        var left = e.pageX - offset(this).left - $('.mask').width()/2;//蒙板X轴定位
        var top = e.pageY - offset(this).top - $('.mask').height()/2;//蒙板Y轴定位

        // 限制蒙板的移动区域
        if (left <= 0) {
            left = 0;
        }
        if (left >= ($('.min-box').width() - $('.mask').width())) {
            left = $('.min-box').width() - $('.mask').width();
        }
        if (top <= 0) {
            top = 0;
        }
        if (top >= ($('.min-box').height() - $('.mask').height())) {
            top = $('.min-box').height() - $('.mask').height();
        }

        // 设置蒙板定位
        $('.mask').css({left:left + 'px'});
        $('.mask').css({top:top + 'px'});

        // 计算移动的比例
        var scalex = left / ($('.min-box').width() - $('.mask').width());
        var scaley = top / ($('.min-box').height() - $('.mask').height());

        // 计算大图移动的距离
        var maximgX = scalex * ($('.max-box img').width() - $('.max-box').width());
        var maximgY = scaley * ($('.max-box img').height() - $('.max-box').height());

        // 设置大图定位
        $('.max-box img').css({left:-maximgX + 'px'});
        $('.max-box img').css({top:-maximgY + 'px'});
    });
}
Magnifier();

// 秒杀事件
$('body').on(setInterval(function (){

    var d1 = new Date('2021/01/01 00:00:00');//倒计时结束时间
    var d2 = new Date();//当前时间

    var time1 = d1.getTime();//1970到2020/1/1的毫秒数
    var time2 = d2.getTime();//1970到当前的毫秒数
    var times = time1 - time2;//当前到2020.1.1的毫秒数

    var days = parseInt( times / (1000*60*60*24) );//剩余天生

    var hours = 23 - d2.getHours();

    var minutes = 59 - d2.getMinutes();

    var seconds = 59 - d2.getSeconds();

    // var millis = 999 - d2.getMilliseconds();

    document.querySelector('.clock').innerText = days+'天'+hours+'时'+minutes+'分'+seconds+'秒';

},1000));

})