// 封装设置cookie函数
function setCookie(key,val,day){
    if (day) {
        var d = new Date();
        d.setDate(d.getDate()+day);
        document.cookie = key + '=' + escape(val) + '; expires=' + d;
    } else {
        document.cookie = key + '=' + escape(val);//对值进行编码
    }
    
}
// 封装获取cookie的函数
function getCookie(key){
    var arr1 = document.cookie.split('; ');//["key5=xiaozhao", "key6=xiaozhang"]
    var arr2;
    for (var i = 0; i < arr1.length; i++){
        arr2 = arr1[i].split('=');// ["key5","xiaozhao"]
        if (arr2[0] == key) {
            return unescape(arr2[1]);//返回解码之后的值
        }
    }
    return null;
}
// 封装删除cookie函数
function removeCookie(key){
    setCookie(key,'123',-2);//设置为过去的时间
}