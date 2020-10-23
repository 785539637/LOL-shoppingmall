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

    // 判断购物车是否有数据
    if (localStorage.getItem('goods')) {
        
        // 获取本地数据code
        var codeArr = JSON.parse(localStorage.getItem('goods')).code;
        $('.cart_num').html(codeArr.length);
        

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
                            res += `<li code="${item.code}">
                                    <img src="${item.imgUrl}" alt="">
                                    <h5>${item.title}</h5>
                                    <p>${item.price}</p>
                                    <span>删除</span>
                                </li>`;
                        };
                    });
                });
                $('.list').html(res);
            }
        });

        // 删除购物车商品
        $('.list').on('click','li span',function () {
            
            // 获取删除商品的编号
            var code = $(this).parent().attr('code');

            // 删除数组元素
            $.each(codeArr,function (index,item) {//遍历商品编号数组
                
                if (code == item) {//匹配编号
                    codeArr.splice(index,1);//删除
                    $('.cart_num').html(codeArr.length);
                    return false;
                };
            });

            if (codeArr.length == 0) {//判断数组长度

                $('.list').html(`<li class="empty"><a href="goodlist.html">你的购物车空空如也，快去加入宝贝吧~</a></li>`);

                localStorage.removeItem('goods');

            } else {//保存数据
                
                var jsonStr = JSON.stringify({"code":codeArr});
                localStorage.setItem('goods',jsonStr);
            };

            // 删除节点
            $(this).parent().remove();

            alert('删除成功!');
        })

        


    } else {
        $('.list').html(`<li class="empty"><a href="goodlist.html">你的购物车空空如也，快去加入宝贝吧~</a></li>`);
    }

})