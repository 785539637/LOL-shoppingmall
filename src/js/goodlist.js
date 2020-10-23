$(function () {
    
    if (localStorage.getItem('goods')){//判断本地存储是否有商品
        localStorage.clear();//清空本地数据
    }

    // 加载数据
    $.ajax({
        type : 'get',
        url  : '../static/data/goods.json',
        cache : false,
        dataType : 'json',
        success : function (jsonArr) {
            var res = '';
            $.each(jsonArr,function (index,item) {
                res += `<div class="goods" code="${item.code}" num="${item.num}">
                    <img src="${item.imgUrl}" alt="">
                    <p>${item.price}</p>
                    <h5>${item.title}</h5>
                    <div>加入购物车</div>
                </div>`
            });
            $('.goodList').html(res);
        }
    });
    
    

    // 添加购物车
    $('.goodList').on('click','.goods div',function () {

        var code = $(this).parent().attr('code');//获取点击商品的编号
        
        if (localStorage.getItem('goods')) {//判断本地存储是否有加入购物车的商品
            var codeArr = JSON.parse(localStorage.getItem('goods')).code;
        } else {
            var codeArr = [];
        };

        codeArr.push(code);//将点击商品的编号添加到商品编号数组中

        var jsonStr = JSON.stringify({"code":codeArr});//将获取到的商品编号转为json字符串

        localStorage.setItem('goods',jsonStr);//存储到本地数据

        alert('添加成功!赶快去我的购物车看看吧~');
    });

    // 查看商品详情
    $('.goodList').on('click','.goods img',function () {

        var code = $(this).parent().attr('code');//获取点击商品的编号
        
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

});