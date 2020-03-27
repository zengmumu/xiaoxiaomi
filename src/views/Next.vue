<template>
    <div>
       <!--  <h1>nextTick</h1>
        <p ref="myp">{{msg}}</p>
        <p>msg1:{{msg1}}</p>
        <p>msg2:{{msg2}}</p>
        <button @click="changeIt">改变</button> -->
        <h1>render</h1>
        <Child :level="1">
            <span>我是插槽内容A</span>
        </Child>
        <Child :level="2">
            <span slot="dream">我有个梦想</span>
        </Child>
        <Child :level="3"></Child>
        <my-list :item="'我喜欢前端'"></my-list>
         <MyList :item="['zql','mumu','曾庆林']"></MyList>
    </div>
</template>
<script>
let Child = {
    props:{level:{type:Number}},   // 组件的参数  
    methods:{clickHd(e){alert(e.target.title)}},
    render(createElement){         // render渲染组件        
        return createElement('h'+this.level,{
            class:{'big':true},  // 类绑定
            style:{color:this.level==2?'red':'black'},  // 行内样式绑定
            attrs:{title:this.level+'标题'},            //  html属性绑定
            ref:'myh'+1,                                //  vue ref属性绑定
            on:{"click":this.clickHd}                   //  click事件绑定
            // domProps:{innerHTML:"<em>你好内容</em>"}
        },['你好 vue',this.$slots.default,this.$slots.dream])
        // createElement 用来创建虚拟dom
    }
}
let MyList = {
    props:{item:{type:[String,Array]}},//指定props的内容为字符串与数组
    // 如果传过来的参数item 是数组就渲染为ul  是普通文文本就渲染p标签
    render(createElement){
        //  如果是一个数组 那么就渲染成ul
        if(Array.isArray(this.item)){
            return createElement("ul",{},this.item.map(it=>{
                return createElement("li",it)
            }))

        }else{
         // 否则就渲染为一个普通的p标签
            return createElement("p",this.item)
        }
    }
}

export default {
    components:{Child,MyList},
    data(){return{
        msg:'HI vue',
        msg1:'',
        msg2:''
    }
    },
    methods:{
        changeIt(){
            // 设置msg1的值为 myp的html文本内容
            this.msg = "你好，中国";
            this.msg1 = this.$refs.myp.innerHTML;
            // 虽然msg已经发生改变了  myp里面的内容也发生改变，但是取myp的innerHTML 内容还没有渲染 
            // 所以取到了msg上一次的值
            this.$nextTick(()=>{ 
                // dom渲染完毕再执行 
                 this.msg2 =  this.$refs.myp.innerHTML;
            })
           

        }
    }
    
}
</script>