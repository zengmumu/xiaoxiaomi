<template>
<div v-if="views&&views.goods_info">
    <h1>产品</h1>
    <van-swipe>
        <van-swipe-item v-for="(item,index) in views.goods_info[current].gallery_v3" :key="index">
            <img :src="item.img_url" width="100%"/>
        </van-swipe-item>
    </van-swipe>
    <!-- 类型 -->
    <div><button 
    :class="{'active':item.prop_value_id==selectType}"
    v-for="(item,index) in views.buy_option[0].list" 
    :key="index"
    @click="selectType=item.prop_value_id"
    >{{item.name}}</button></div>
        <!-- {{color}}; 可以选择的颜色id -->
        <!-- {{ colorStr}} 可以使用的颜色项目 -->
    <div><button   :class="{'active':item.prop_value_id==selectColor}"  
    v-for="(item,index) in colorStr" :key="index"
        @click="selectColor=item.prop_value_id"
    >{{item.name}}</button></div>

    <p> {{ views.goods_info[current].name}}</p>
    {{ views.goods_info[current].price}}
    <p v-html=" views.goods_info[current].product_desc"></p>
 
</div>
</template>
<script>
export default {
    computed:{
        color:function(){
            let list =[];
            this.views.goods_info.forEach(item=>{
                if(item.prop_list[0].prop_value_id==this.selectType){
                    list.push(item.prop_list[1].prop_value_id);
                }
            })
            return [...new Set(list)]
        },
        colorStr:function(){            
            return this.views.buy_option[1].list.filter(item=>{
                return this.color.find(it=>it==item.prop_value_id);
            })
        },
        current(){
             let num = 0;
             this.views.goods_info.map((item,index)=>{
                if(item.prop_list[0].prop_value_id==this.selectType&&item.prop_list[1].prop_value_id==this.selectColor){
                    num = index;
                }
             })
             return num;
        }
    },
    data(){
        return {
            views:{},
            // current:0,//当前商品为第1个子商品            
            selectType:'',
            selectColor:'',
            }
        }, // 当前页面的数据
    created(){
        this.getView();// 当页面创建我们去获取视图数据
    },
    methods:{
        getView(){
            this.$http.get("http://www.520mg.com/mi/product.php?id="+this.$route.params.id)
            .then(res=>{
                console.log(res.data.data);
                this.views  = res.data.data;
                this.selectType = this.views.goods_info[0].prop_list[0].prop_value_id;
                this.selectColor =this.views.goods_info[0].prop_list[1].prop_value_id;

            })
        }
    }
}
</script>
<style>
    .active{color:#f30}
</style>