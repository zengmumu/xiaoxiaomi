<template>
  <div id="app">
    <transition 
      enter-active-class="slideInRight animated"
      leave-active-class="slideOutRight animated"      
    >
         <router-view class="page"/>
    </transition>   
    <!-- router-view 存放页面 -->
    <div id="nav">
      <router-link to="/">首页</router-link>  
      <router-link to="/cat">分类</router-link>  
      <router-link to="/cart">购物车</router-link> 
      <router-link to="/user">我的</router-link>
      <!-- router-link 切换页面导航 -->
    </div>  
    <!-- <van-tabbar route>
      <van-tabbar-item   to="/" icon="home-o">
    分类
     <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon.active : icon.inactive"
    >
  </van-tabbar-item>
  <van-tabbar-item   to="/cat" icon="home-o">
    分类
  </van-tabbar-item>
  <van-tabbar-item   to="/cart" icon="search">
   购物车
  </van-tabbar-item>
    <van-tabbar-item  to="/user" icon="search">
   我的
  </van-tabbar-item>
  
  
</van-tabbar>   -->
  </div>
</template>
 <script>
 export default {
   data(){return {active:0}},
   created(){
     console.log(this.$router)
   }
 }
 </script>
 
<style>
*{margin: 0; padding: 0;}
/* 清零 */
a{text-decoration: none; color: #777;}
/* a 装饰线没有，颜色默认灰色 */
.page{ position: absolute; left:0; right:0; top:0; bottom:.98rem; overflow: auto;background-color: #fff; }
/* 页面固定定位再页面顶部 bottom:49px留出底部栏高度，内容溢出自动 */
.animated{  
  animation-duration: .4s !important;  /* 修改时间 */
}
.slideOutRight{ animation-delay: .4s;filter:brightness(80%)}
#nav{ 
  display: flex; 
  /* 弹性布局 */
  box-shadow: 0 -2px 4px rgba(200,200,200,.4);
  /* 阴影 x y 模糊 颜色值 */
  width: 100%; position: absolute; left:0; right:0; bottom:0; height: .98rem;
  /* 固定再页面底部 高度49 */
   }
#nav a{ 
  flex:1; 
  /* 自适应宽 */
  line-height: .98rem; 
  /* 100px = 1rem; */
  text-align: center;
  /* 垂直水平居中 */
   }
  /* 精确匹配-配置和路由地址完全一致 */
.router-link-exact-active {
  color:#f30;
}
/* .route-link-active  配置 地址和路由配置有部分匹配 */


</style>
