<template>
    <div>
        分类
         <button @click="$router.push('/login?redirect=/cat')">登录</button>
       <!-- {{sku}} -->
    </div>
</template>
<script>
export default {
    data(){
        return {view:{},show:true};

    },
    created(){
        this.getView();
    },
    computed:{
        sku(){
            if(!this.view){return {}}            
            let tree = this.view.buy_option
            .map(item=>{
                return ({
                     k:item.name,
                     v:item.list.map(items=>{return({
                         id: items.prop_value_id, // skuValueId：规格值 id
                        name: items.name, // skuValueName：规格值名称
                       
                     })})
                            })
            }); 
            let list = this.view.goods_info;
         /*    .map(item=>{
                return ({
                   
                    id: item.goods_id, // skuId，下单时后端需要
                    price: item.price, // 价格（单位分）
                    s1: item.prop_list[0].prop_value_id, // 规格类目 k_s 为 s1 的对应规格值 id
                    s2: item.prop_list[1].prop_value_id, // 规格类目 k_s 为 s2 的对应规格值 id
                    s3: item.prop_list[2]?item.prop_list[2].prop_value_id:0, // 最多包含3个规格值，为0表示不存在该规格
                    stock_num: item.buy_limit // 当前 sku 组合对应的库存
 
                })
            }) */
            // console.log(tree);
            // return {tree,list}
        }
    },
    methods:{
        getView(){
            this.$http.get("/mi/product.php?id=10000217")
            .then(res=>{
                this.view = res.data.data;
            })
        }
    }
}
</script>