<template>    
    <div class="cart">
    <van-nav-bar  title="购物车" left-arrow @click-left="$router.go(-1)">
        <van-icon name="search" slot="right" />
     </van-nav-bar>
     <div class="content">
        <div class="row" v-for="(item,index) in goods" :key="index">
            <div class="col-10 sel"> <!-- 遍历 goods商品列表 -->               
                <van-checkbox v-model="item.select" checked-color="#f30"></van-checkbox>
            </div>
            <div class="col-30">
                <img :src="item.img_url" width="80%" alt="">
            </div>
            <div class="col-50">
                <p>{{item.name}}</p>
                <p>{{item.price}}</p>
                <van-stepper v-model="item.num" step="1" min="1" :max="item.buy_limit" />
            </div>
            <div class="col-10 del" @click="delCart(item)">
                <van-icon name="delete" />
            </div>
        </div>
     </div>
     <div class="foot">
         <div class="col" style="flex-direction:column;">
            <p>总数：{{allNum}}</p> 
            <p style="color:#f30;font-size:.4rem">￥{{allPrice}}</p>
         </div>
         <div class="col" @click="$router.go(-1)">
             继续购物
         </div>
         <div class="col" style="background:#f30;color:#fff">
             结算
         </div>
     </div>
    </div> 
</template>
<style  scoped>
.foot{
    display: flex;
}
.foot .col{
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.row{ display: flex; margin-bottom: .3rem;}
.sel{ display: flex;justify-content: center; align-items: center; }
.del{display: flex;justify-content: center; align-items: flex-end;}
.col-10{flex-basis: 10%;max-width: 10%; width: 10%; display: flex;}
.col-30{flex-basis: 30%;max-width: 30%; width: 30%;}
.col-50{flex-basis: 50%;max-width: 50%; width: 50%;}
.cart{ display: flex; flex-direction: column;height: 100%; overflow: hidden; }
/* 弹性垂直布局 */
.content{ flex:1; overflow: auto; scroll-behavior: smooth; }
/* 自适应高  自动出现滚动条 滚动平滑 */
.content::-webkit-scrollbar{display: none;}
/* 隐藏滚动条 */
.foot{ height: .98rem; }
/* 设置高.98 */    
</style>
<script>
import {mapState,mapMutations,mapGetters} from 'vuex'   //导入映射方法
// 导入vuex 的映射方法
export default {
    methods:{
        ...mapMutations(["delCart"]),
        // 把delCart映射为vue中的普通方法
    },
    computed:{
        ...mapState(["goods"]), //把vuex里面的数据映射为vue里面数据
        ...mapGetters(["allNum","allPrice"]),
    },
    created(){ this.$emit("footerEvent",false) },
    // 进入页面隐藏底部导航条
    destroyed(){ this.$emit("footerEvent",true) },
    // 销毁页面开启底部导航条
    // 路由（页面）离开前做一些判断
    beforeRouteLeave (to, from, next) {
        this.$emit("footerEvent",true);
        let flag = true;
    //   let flag= window.confirm("现在商品是10周内最便宜的价格\n您确定要离开吗?");
      if(flag){
          next();
      }else{
          next(false);
      }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{           
              vm.$emit("footerEvent",false)
        })
    }
    // 当进入页面前隐藏底部栏
}
</script>
