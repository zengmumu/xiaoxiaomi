<template>
    <div class="category">
     <van-nav-bar  title="分类" left-arrow  @click-left="$router.go(-1)">
        <van-icon name="search" slot="right" />
     </van-nav-bar>
     <div class="content" v-if="cate.length">
         <div class="left"  ref="left">
             <div class="item" 
             v-for="(item,index) in cate"  
             :key="index"
             :class="{'active':index==current}"
             @click="changeCur(index)"
             >
                 {{item.category_name}}
            </div>
         </div>
         <div class="right">
             <!-- {{cate[current].category_name}} -->
             <div v-for="(item,index) in cate[current].category_list" :key="index">
                 <div  v-if="item.view_type=='category_title'" class="category_title">
                     {{item.body.category_name}}
                 </div>
                 <div v-if="item.view_type=='cells_auto_fill'">
                     <img v-lazy="item.body.items[0].img_url" :style="{width:item.body.w/100+'rem',height:item.body.h/100+'rem'}" alt="">
                 </div>
                <div v-if="item.view_type=='category_group'" class="group">
                    <div class="col-33" 
                    v-for="(product,index) in item.body.items" 
                    :key="product.product_name+index"
                    @click="$router.push('/produce/'+product.action.path)"
                    >
                    <!-- 单击跳转到 /produce/+对应的path  跳转到详情页面，produce的名称是在路由配置里面对应的-->
                        <img v-lazy="product.img_url" width="80%" alt="">
                        <p>{{product.product_name}}</p>
                    </div>                    
                 </div>                
             </div>
         </div>
     </div>
    </div>
</template>
<script>
export default {
     name:'Category',
    data(){ return {
        cate:[],//分类信息
        current:0,// 当前被选择的item       
    }},  
    created(){
        this.getCate();
    },
    methods:{
        changeCur(index){
            this.current = index;
            let left = this.$refs.left; //选择到left
            let items = document.querySelectorAll(".left .item"); //选择到items
            let el = items[index] //当前被单击的item
            let leftH = left.offsetHeight;//left 高
            left.scrollTop = el.offsetTop-leftH/2-el.offsetHeight/2;
            // 设置left顶部滚动的高是=当前单击元素与left顶部的距离-left高度一般-单击元素自己高度一般
        },
        // 获取分类
        getCate(){
            this.$http.get("/mi/category.php")
            .then(res=>{
                // console.log(res.data);
                this.cate = res.data.data;
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>
<style scoped>
    .group{
        display: flex;
        flex-wrap: wrap;
    }
    .col-33{
        width: 33.333%;
        flex-basis: 33.333%;
        max-width:  33.333%;
        /* 固定宽1/3 */
        text-align: center;
        padding: .20rem;
        /* 文字居中有点间距 */
        box-sizing: border-box; /* 宽度从边框开始*/
    }
    .col-33 p{
        font-size: .24rem; 
        color:#333; /* 文字小点，深灰色*/
        text-overflow: ellipsis;  /* 文字超出省略... 下面的两行也要写*/
        white-space: nowrap;
        overflow: hidden;
    }
    .category_title{text-align: center; line-height: .88rem; margin:.30rem 0;}
     .item.active{color:#f30}
     /* 元素即拥有item 也拥有 active  class类名*/
    .category{ display: flex; flex-direction: column;  }
    .content{ flex:1; /* 自适应高 */ display: flex; height: 100%; overflow:hidden; }
    .left{  width:1.5rem; height: 100%; overflow: auto; border-right: 1px solid #fafafa; /*宽1.5rem 高100%； 超出高度隐藏 有边框*/ 
    scroll-behavior: smooth;
    /* left滚动平滑 */
    }
    .left::-webkit-scrollbar{ display:none;}
    /* left 滚动条隐藏 */
    
    .right{ flex:1; /* 自适应宽 */ height: 100%; overflow: auto; }
    .left .item{
        height: .88rem;
        line-height: .88rem;
        text-align: center;
        font-size: .24rem;
        border-bottom:1px solid #fafafa;
        /* 高.88rem，行高.88rem; 文字居中  文字大小.12rem  下边框 */

    }
</style>

 