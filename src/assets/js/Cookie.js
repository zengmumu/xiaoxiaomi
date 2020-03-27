// setCookie 用来设置cookie  
 // 名称，值，日期，路径
 function setCookie(name,value,date,path="/"){
    var str=name+"="+escape(value)+";";
    // 如果用户调用函数时传入了date 才会执行if里面语句
    if(date){
        var d = new Date();
        d.setDate(d.getDate()+date);
        str+="expires="+d+";";		 
    }
    str+="path="+path+";"
    document.cookie = str;
    console.log(str);
}
// var str = document.cookie;
// console.log(str);
// getCookie 用户获取cookie 通过名称
function getCookie(name){
   // 获取到所有对的cookie
   var str = document.cookie;
   // cookie 按一种形式分割为数组；
   var arr = str.split("; ");
   for(var i=0;i<arr.length;i++){
       var temp = arr[i].split("=");
       // temp[0]是名称 temp1是值
       if(temp[0]==name){return unescape(temp[1])}
   }
}

// 删除cookie delCookie  参数name,path="/"
// 当过期时间小于当前时间就删除了。
function delCookie(name,path="/"){
    var d = new Date();
    d.setTime(0);
    // 设置值为空 过期时间为 当前时间以前的时间
    document.cookie=name+"=;expires="+d+";path="+path;
    
}
export default {getCookie,setCookie,delCookie}
 