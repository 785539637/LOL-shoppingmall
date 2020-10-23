// 轮播图
function swiper() {  
    var mySwiper = new Swiper ('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        direction: 'horizontal', // 水平切换选项
        speed:100,//切换速度
        // grabCursor : true,//抓手形状
        freeMode : true,//自由模式
        keyboard : true,//键盘控制
        // mousewheel: true,//鼠标控制

        loop: true, // 循环模式选项
        // autoplay:true,//等同于以下设置
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
            },
        
        // 如果需要分页器
        pagination: {
        el: '.swiper-pagination',
        clickable :true,
        },
        
        // 如果需要前进后退按钮
        // navigation: {
        // nextEl: '.swiper-button-next',
        // prevEl: '.swiper-button-prev',
        // },
        
        // 如果需要滚动条
        scrollbar: {
        el: '.swiper-scrollbar',
        },
    })
}
swiper();        

// 登录注册
function Login() {
    
    var un_login = document.querySelector('.un_login');
    var logined = document.querySelector('.logined');
    var login_username = document.querySelector('.login_username');
    var register = document.querySelector('.register');
    var login = document.querySelector('.login');
    var user = document.querySelector('.user');
    var pass = document.querySelector('.pass');
    var rem = document.querySelector('.rem');
    var close = document.querySelector('.close');
    var mask = document.querySelector('.mask');
    var form = document.querySelector('form');
    var logout = document.querySelector('.logout');

     
    // 请登录
    un_login.onclick = function (){
        mask.style.display = 'block';
        form.style.display = 'block';

        // 判断之前是否有保存账号密码
        if (getCookie('username')) {
            user.value = getCookie('username');
            pass.value = getCookie('userpass');
            rem.checked = true;// 设置为勾选状态
        }   
    }

    
    // 点击登录
    login.onclick = function () {

        // 空值判断
        if (!user.value || !pass.value) {
            alert('账号或密码不能为空!');
            return false
        }

        ajax({
            type : 'get',
            url  : '../static/data/login.php',
            data : `act=login&user=${user.value}&pass=${pass.value}`,
            success : function (res) {
                var json = JSON.parse(res);
                alert(json.msg);
                if (json.err == 0) {
                    logined.style.display = 'block';
                    un_login.style.display = 'none';
                    form.style.display = 'none';
                    mask.style.display = 'none';
                    login_username.innerHTML = user.value;  
                }else{
                    user.value = '';
                    pass.value = '';
                    rem.checked = false;
                    return;
                }
                
            },
            error : function (code) {
                var json = JSON.parse(code);
                alert(json.msg);
                
            }
        })

        // 判断是否勾选记住账号
        if (rem.checked) {//勾选
            // 保存账号密码
            setCookie('username',user.value,7);
            setCookie('userpass',pass.value,7);
        } else {//未勾选
            // 删除账号密码
            removeCookie('username');
            removeCookie('userpass');
        }
    }

    // 点击注册
    register.onclick = function () {

        // 空值判断
        if (!user.value || !pass.value) {
            alert('账号或密码不能为空!');
            return false;
        }

        ajax({
            type : 'get',
            url  : '../static/data/login.php',
            data : `act=add&user=${user.value}&pass=${pass.value}`,
            success : function (res) {
                var json = JSON.parse(res);
                alert(json.msg);
            },
            error : function (code) {
                var json = JSON.parse(code);
                alert(json.msg);
                user.value = '';
                pass.value = '';
                rem.checked = false;
            }
        })
    }

    // 点击X
    close.onclick = function (){
        mask.style.display = 'none';
        form.style.display = 'none';
    }

    // 退出登录
    logout.onclick = function () {
        logined.style.display = 'none';
        un_login.style.display = 'block';
    }

}
Login();

$(function () {

    // 购物车数字
    if (localStorage.getItem('goods')) {//判断本地存储是否有商品
        var codeArr = JSON.parse(localStorage.getItem('goods')).code;
        $('.cart_num').html(codeArr.length);
    }
    
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

    // 查看商品详情
    $('.main li').on('click',function () {

        var code = $(this).attr('code');//获取点击商品的编号
        
        if (localStorage.getItem('goods')) {//判断本地存储是否有商品
            var codeArr = JSON.parse(localStorage.getItem('goods')).code;
        } else {
            var codeArr = [];
        };

        codeArr.push(code);//将点击商品的编号添加到商品编号数组中

        var jsonStr = JSON.stringify({"code":codeArr});//将获取到的商品编号转为json字符串

        localStorage.setItem('goods',jsonStr);//存储到本地数据

        location.href="goods.html";
  
        
    });

    $('.banner .swiper-slide').on('click',function () {

        var code = $(this).attr('code');//获取点击商品的编号
        
        if (localStorage.getItem('goods')) {//判断本地存储是否有商品
            var codeArr = JSON.parse(localStorage.getItem('goods')).code;
        } else {
            var codeArr = [];
        };

        codeArr.push(code);//将点击商品的编号添加到商品编号数组中

        var jsonStr = JSON.stringify({"code":codeArr});//将获取到的商品编号转为json字符串

        localStorage.setItem('goods',jsonStr);//存储到本地数据

        location.href="goods.html";
  
    });

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

})