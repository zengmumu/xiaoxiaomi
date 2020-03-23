<template>
    <div>
        <!-- 数据结构解释
        sections 是一个数组 section 数组的一项
        section>body>items items 就是幻灯片每一项数据
        item.w/100+"rem"  w是720是像素单位 转换为rem单位需要除以100
         -->
        <div v-for="(section,index) in sections" :key="index">
            <div v-if="section.view_type=='gallery'">
            <!-- view_type=="gallery视图类型为幻灯片类型（查看api文档和数据结构得知）" -->
                <van-swipe>
                    <van-swipe-item v-for="(item,ind) in section.body.items" :key="ind">
                        <img :src="item.img_url" :style="{width:item.w/100+'rem',height:item.h/100+'rem'}" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- cells_auto_fill  绝对定位类型 -->
            
            <div 
            v-if="section.view_type=='cells_auto_fill'" 
            :style="{position:'relative',width:section.body.w/100+'rem',height:section.body.h/100+'rem'}">
            <!-- 设置父元素的宽高  section.body.w通过查看数据结构了解 -->
                <div 
                v-for="(item,ind) in section.body.items" :key="ind"
                :style="{position:'absolute',width:item.w/100+'rem',height:item.h/100+'rem',left:item.x?item.x/100+'rem':0,top:item.y?item.y/100+'rem':0}"
                >
                <img :src="item.img_url" width="100%" alt="">
                </div>
            <!-- 设置子元素的宽高xy -->

            </div>
            <div 
            v-if="section.view_type=='divider_line'" 
            :style="{height:section.body.line_height/100+'rem','background-color':section.body.line_color}">            
            </div>
            <!-- 分割线完成 -->
            <div v-if="section.view_type=='list_three_type4'" class="row" style="padding:0.20rem;">
                <div 
                v-for="(item,ind) in section.body.items" 
                :key="ind"
                class="col"
                :style="{'margin-left':ind==1?'.2rem':0,'margin-right':ind==1?'.2rem':0}"
                >
                <img :src="item.img_url" width="100%" alt="">
                <h5>{{item.product_name}}</h5>
                <p>{{item.product_brief}}</p>
                <p>{{item.product_price}}</p>                

                </div>
            </div>
             <!-- 一行三个 -->
              <div v-if="section.view_type=='list_two_type13'" class="row" style="padding:0.20rem;">
                <div 
                v-for="(item,ind) in section.body.items" 
                :key="ind"
                class="col tac"
                :style="{'margin-left':ind==1?'.2rem':0}"
                >
                <img :src="item.img_url" width="100%" alt="">
                <h5>{{item.product_name}}</h5>
                <p>{{item.product_brief}}</p>
                <p>{{item.product_price}}</p>  
                <van-button :color="section.body.btn_color" size="small" :text="item.btn_txt?item.btn_txt:'立即购买'"></van-button>              

                </div>
            </div>
             <!-- 一行两个 -->
        </div>
    </div>
</template>
<style >
    .row{ display:flex;}
    .col{flex:1;}
    .tac{text-align: center;}
</style>
<script>
export default {
    props:["item"],
    //  父组件传递过来的item参数
    data(){return {sections:[]}},
    // 初始化当前页面sections数据
    created(){
        this.getSections();
    // 当组件创建完毕去获取页面数据
    },
    methods:{
        getSections(){
            this.$http.get(`http://www.520mg.com/mi/page.php?page_id=${this.item.page_id}&page_type=${this.item.page_type}`)
            // 发起ajax get请求获取数据 参数更加父组件传递来的item 变化
            .then(res=>{
                this.sections =  res.data.data.data.sections;
            // 阅读api文档 查看数据结构，设置当前页面的数据
                console.log(this.sections);
            })
            .catch(err=>{})
        }
    }
}
</script>