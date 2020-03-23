<template>
    
    <div>
        <h1>购物车</h1>
    </div>
 
</template>
<script>
export default {
    // 路由（页面）离开前做一些判断
    beforeRouteLeave (to, from, next) {
      let flag= window.confirm("现在商品是10周内最便宜的价格\n您确定要离开吗?");
      if(flag){
          next();
      }else{
          next(false);
      }
    }
}
</script>
