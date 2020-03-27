<template>
<div v-if="views&&views.goods_info" class="product">
    <div class="header">
        <van-icon class="icon" name="arrow-left" color="#fff" @click="$router.go(-1)" />
        <!-- van-icon是导入的vant里面的组件  放置 图标 名称箭头 颜色白色  单击返回 -->  
        <van-icon   class="icon"  name="share" color="#fff" />
    </div>
    <van-swipe>
        <van-swipe-item v-for="(item,index) in views.goods_info[current].gallery_v3" :key="index">
            <img v-lazy="item.img_url" width="100%"/>
        </van-swipe-item>
    </van-swipe>
    <div class="info">
        <h2>{{views.product_info.name}}</h2>
        <p v-html="views.product_info.product_desc"></p>
        <p class="price">￥<span>{{views.goods_info[current].price}}</span></p>
        <!-- 产品名称，描述，价格 -->
    </div>
    <div class="class_parameters">
        <div class="param" v-for="(item,index) in views.goods_info[current].class_parameters.list" :key="index" v-if="item.top_title">
            <!-- 循环每个产品的经典参数 -->
            <img v-lazy="item.icon" alt="">
            <!-- 参数的图片 -->
            <span class="top_title">{{item.top_title}}</span>
            <!-- 参数标题，与下面描述 -->
            <span class="bottom_title">{{item.bottom_title}}</span>
        </div>
    </div>
    <div class="buyTab">
        <div class="btns">
            <div class="btn" @click="$router.push('/')">
                <img src="../assets/home.png" alt="">
                <span>首页</span>
            </div>
            <div class="btn" @click="$router.push('/')">
                <img src="../assets/kefu.png" alt="">
                <span>客服</span>
            </div>
            <div class="btn" @click="$router.push('/cart')">
                <img src="../assets/cart.png" alt="">
                <span>购物车</span>
                <van-tag round type="danger"
                v-if="goods.length"
                 class="tag">{{goods.length}}</van-tag>
            </div>
        </div>
        <div class="buy"><van-button color="#f30" round  class="btn" @click="showBuyOption=true">立即购买</van-button></div>
    </div>
    <!-- 弹出购买选项 -->
    <div class="modal" v-if="showBuyOption">
        <div class="modal-content">
            <div class="modal-header">
                <div class="header-close" @click="showBuyOption=false"> <van-icon name="cross" /> </div>
                <div class="goodsInfo">
                    <div class="header-pic">
                        <img width="100%" :src="views.goods_info[current].img_url" alt="">
                    </div>
                    <div class="header-info">
                        <h3><span>￥</span> {{views.goods_info[current].price}}</h3>
                        <p>  {{views.goods_info[current].name}}</p>
                    </div>
                </div>             
            </div>
            <div class="modal-body">
                <p>{{views.buy_option[0].name}}</p>
                <div class="types">
                    <van-button plain hairline class="body-btn"                     
                    v-for="(item,index) in views.buy_option[0].list"  :key="index"                   
                    :color="item.prop_value_id==currentType?'#f30':'gray'" 
                    @click="currentType=item.prop_value_id"
                    >
                    <!-- 遍历 购买选项的第0项目 list  动态绑定active Class 
                      单击是设置curretType为当前的item的 prop_value_id  
                      在getView 设置 默认的 currentType(data里面也需要定义下)
                     this.currentType = this.views.goods_info[this.current].prop_list[0].prop_value_id;,
                     -->
                        {{item.name}}
                    </van-button>
                </div>                
                 <div class="colors">
                      <p>{{views.buy_option[1].name}}</p>
                    <van-button plain hairline 
                    :color="item.prop_value_id==currentColor?'#f30':'gray'" 
                    class="body-btn"
                     v-for="(item,index) in colorStr" 
                     :key="index"                    
                     @click="currentColor=item.prop_value_id"
                     > {{item.name}}</van-button>
                 </div>
                 <div class="nums">
                     <p>购买数量:</p>
                     <van-stepper v-model="num" step="1" :max="views.goods_info[current].buy_limit" />
                 </div>
            </div>
            <div class="modal-foot"> <van-button color="#f30" round   block  @click="buy" >立即购买</van-button> </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.nums{
    display: flex;
     
    justify-content: space-between;
    margin-top:.3rem; }
.modal-body{ padding-left: .3rem; padding-right: .3rem;} /* 左右间距 .3rem */
.modal-body p{ line-height: .6rem; height: .6rem;}  /* 标题高度与行高 */
.body-btn{ margin-right: .15rem; font-size: .2rem; padding-left: .15rem; padding-right: .15rem;}  /* 按钮缩小点 */
.modal-body .colors{ margin-top: .3rem;}
.goodsInfo{ display: flex; padding-left:.3rem; padding-right:.3rem; }
/* 商品信息 弹性布局  左右间距.3 */
.header-pic{ width: 2rem; padding-right: .3rem; } /* 图片宽2rem 右侧间距 .3 */
.header-info{ flex:1; }/* 自适应宽 */
.header-info h3{ color:#f30; font-size: .5rem; }
/* 价格 彩色  文字大一点 */
.header-info span{ font-weight: normal; font-size: .24rem; }
/* ￥字 不加粗 小一点， */
.header-close{ display: flex; justify-content: flex-end; align-items: center; height: .6rem; padding-right: .3rem; }
/* 弹性布局  右对齐   垂直居中  高度.6 右侧间距.3 */
span.active{color:#f30;}
.modal{ 
    position: fixed; left:0; top:0; bottom:0;right:0;
    background-color: rgba(0,0,0,.4);
}   /* 全屏 背景半透明 */ 
.modal-content{
    /* 距离顶部4rem */
    position: absolute; left:0; top:4rem; bottom:0;right:0;
    background-color:#fff;
    border-radius:8px 8px 0 0;
    display: flex;flex-direction: column;}
.modal-header{ /* 高度3rem */ height: 3rem; }
.modal-body{ /*自适应高 */ flex:1; }
.modal-foot{ /* 高度.89rem */ height: .89rem; padding: .30rem; }
.product{padding-bottom: .7rem; overflow: hidden;}
.btns{ flex:1; display: flex; }/* 自适应宽各占1半 开启弹性布局*/
.btn{ 
    position: relative;
    font-size: .24rem; width: .88rem; height:.98rem; /* 宽高设置*/
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    /* 弹性布局内容水平居中垂直居中 */    }
.btn img{ width: .44rem; } /* 设置图片的宽*/
.buy{
    flex:1; display: flex; padding-right: .15rem; justify-content: flex-end; align-items: center;
      /* 自适应各占一半  开启弹性布局  右内边距.15  内容水平居中 垂直居中*/}
.buy .btn{ width: 2.6rem; height: .6rem;}
.buyTab{
    position: fixed; left:.1rem; right:.1rem; bottom:.1rem; height: .98rem; border-radius: 6px;
    box-shadow: 0 2px 4px #aaa;
    background-color: #fff;
    display: flex;
    /* 固定定位 左 下 右 .1rem 间距    高.98 圆角6   阴影 ，背景色 开启弹性布局 */
}

.class_parameters{ 
    margin:.3rem;
    display: flex; 
    flex-wrap:nowrap; 
    overflow: auto; 
    scroll-behavior: smooth;
    /*弹性布局 不换行  超出部分隐藏  滚动平滑 */
    }
.param{
    display: flex; 
    flex-direction: column; 
    align-items: center;
    flex-basis: 1.6rem;
    /* 弹性布局 垂直方向 子水平居中 默认宽1.6rem */
    flex-shrink: 0;
    max-width: 1.6rem;
    box-sizing: border-box;
     width: 1.6rem;
    /* 默认不缩小 最大宽1.6 宽1.6rem 宽从边框算起 */
    padding: 0 .15rem;
    /* 左右间距.15rem */  
    overflow: hidden; 
     /* 超出部分隐藏*/ 
    
    }
.top_title{
    font-size: .14rem; 
    width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    /* 文字大小14 超出部分省略小点 */
    }
.param img{ width: .6rem; } /* 图片宽.6rem */
.bottom_title{
    font-size: .12rem;
    color:#999;
    /* 设置文字大小和颜色，省略小点 */
    width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.info{ padding: .3rem; } /* 内边距*/
.price{color:#f30;font-size: .24rem;} 
.price span{font-size: .6rem;} /* 价格颜色单独设置大些*/

/* scopoed css只在当前组件启用 */
.header{
    position: absolute;
    left: 0;top:0;right:0;height: .88rem;
    /* 绝对定位 定位到顶部 */
    box-sizing: border-box;
    /* 宽从边框算起 */
    display: flex;
    /* 弹性布局 */
    justify-content:space-between;
    /* 如果只有两字元素 ，左右靠边各一个 */
    align-items: center;
    /* 子元素垂直居中 */
    padding-left: .3rem; padding-right: .3rem;
    /* 左右留间距 */
    z-index: 1000000;
    /* 层级提高 */
    background-color: transparent;
    /* 背景色透明 */      
}
.header .icon{
    height: .6rem; width: .6rem;
    /* 设置图标宽高 */
    background-color: rgba(0,0,0,.3);
    /* 背景色黑色半透明 */
    border-radius: .6rem;
    /* 圆角 */
    line-height: .6rem; text-align: center;
    /* 内容 垂直与水平居中 */
}
</style>
<script>
import {mapMutations,mapState} from 'vuex'// 导入映射方法

export default {
    name:'Produce',
    computed:{
        ...mapState(["goods"]),
        // 计算当前的选中类型在咱们的产品列表里面对应的颜色值  
        color(){
            let list = []; //定义一个空的数组
            this.views.goods_info.forEach(item=>{
                // 遍历所有的产品
                // 如果产品里面prop_list 第0个的prop_value_id ==当前产品类型
                if(item.prop_list[0].prop_value_id==this.currentType){
                    list.push(item.prop_list[1].prop_value_id);
                }

            })
            // 把list set去重 转换为 数组 返回
            return [...new Set(list)];
        },
        // 计算当前颜色值对应的buy_option对应的颜色选项
        colorStr(){
            return this.views.buy_option[1].list.filter(item=>{
                // 如果在color里面能找到 item对应的id 就返回为ture
                return this.color.find(it=>it==item.prop_value_id);
                // 如果在color找到 和当前item对应的prop_value_id 就返回为true
                //  如果返回为true则该选项被保留
            })
        },
        // 根据选中选中颜色和选中类型，算出当前对应的商品
        current(){
            let num = 0;//默认为0
            // 遍历所有的产品
             this.views.goods_info.forEach((item,index)=>{
                //  如果该产品的颜色是选中的颜色，类型是选中的类型 那么当前current等于index
                if(item.prop_list[0].prop_value_id==this.currentType&&item.prop_list[1].prop_value_id==this.currentColor){
                    num = index;
                }
             })
            //  当前选中的商品是计算出来的
             return num;

        }
    },
    
    data(){
        return {
            views:{},
            // current:0,
            currentType:'',
             // 默认选中的type类型   
            currentColor:'',
             // 默认选中的颜色类型   
            showBuyOption:false,
             // 是否显示购买选项
             num:1,//当前商品购买数量
            }
        }, // 当前页面的数据
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.$emit("footerEvent",false); 
        })
        // 当路由进入前 隐藏tabs vm 代表this；（直接用this是没有的。）
    },
    created(){
        this.$emit("footerEvent",false);
        // 当进入组件时候 向父组件（app.vue）发送一个事件 事件值是false
        this.getView();// 当页面创建我们去获取视图数据
    },
    destroyed(){
        this.$emit("footerEvent",true); 
          // 当销毁组件时候 向父组件（app.vue）发送一个事件 事件值是true
    },
    methods:{
        ...mapMutations(["addToCart"]),
        buy(){
            let item =Object.assign({},this.views.goods_info[this.current]);
            // item赋值为 浅拷贝  当前的商品对象
            item.num = this.num;
            // 设置数量 step里面绑定的数量
            item.select = true;  // 设置默认选中状态；
            this.addToCart(item);// 把当前的商品添加到 购物车(vuex里面的方法)
            this.showBuyOption=false; //隐藏购买选项
            this.num = 1; //设置购买数据为1 默认为1
        },
        getView(){
            this.$http.get("http://www.520mg.com/mi/product.php?id="+this.$route.params.id)
            .then(res=>{
                console.log(res.data.data);
                this.views  = res.data.data;
                this.currentType = this.views.goods_info[this.current].prop_list[0].prop_value_id;
                 // 默认选中的type类型
                 this.currentColor = this.views.goods_info[this.current].prop_list[1].prop_value_id;
                  // 默认选中的颜色类型
               
               

            })
        }
    }
}
</script>
