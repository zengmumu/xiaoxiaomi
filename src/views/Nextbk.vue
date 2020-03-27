<template>
    <div>
      <div ref="msgDiv">{{msg}}</div>  
      <h2 >msg1: {{msg1}}</h2>
       <h2 >msg2: {{msg2}}</h2>
      <button @click="changeIt">改变</button>
      <Child :level="1">
          <h4>I'am slot</h4>
      </Child>
      <!--  <Child :level="2"></Child>
        <Child :level="3"></Child>
         <Child :level="4"></Child> -->
    </div>
</template>
<script>
let Child = {
    props:{level:{type:Number}},
    data(){return {list:['mumu','zql','曾庆林']}},
    render(createElement){
        let self = this;
        function createInput(arg){
            return createElement("input",
            {
                domProps:{value:arg},
                on:{input:function(e){
                    self.$emit('input',e.target.value)
                    self.list[1]=e.target.value;
                     self.$refs.myp.innerHTML = self.list[1]
                }}
            }
            )
        }
        return createElement('h'+this.level,
        {
            // on:{"click":this.clickHd},
            class:{'big':true},
            style:{color:self.level==3?'red':'black'},
            attrs: { id: 'foo' },
            /* domProps: {
                innerHTML: '<em>not bad</em>'
            } */
        },
        // ['你好中国',this.$slots.default,createElement("p",'this is best')]
        // this.list.map(item=>createElement("li",item))
        [createInput(this.list[1]),createElement("p",{
             ref:"myp"
        },this.list[1])]

        );
    },
    
 
    methods:{
        clickHd(e){
            alert(e.target.tagName)
        }
    }
}
export default {
    components:{Child},
    data(){return {msg:'HI vue',msg1:'',msg2:''}},
    methods:{
        changeIt(){
            this.msg = '你好木木';   
             
             this.msg1 = this.$refs.msgDiv.innerHTML;  
              this.$nextTick(() => {
                 
                  this.msg2 = this.$refs.msgDiv.innerHTML;   
               
            }) 
        }
    }
}
</script>