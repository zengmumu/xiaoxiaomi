<template>
    <div>
        <van-nav-bar
        title="登录"
        left-arrow
        @click-left="$router.go(-1)"
        />
        <van-cell-group style="margin-top:15px;">
            <van-field v-model="uname" placeholder="请输入用户名" />
            <van-field  type="password" v-model="upwd" placeholder="请输入密码"  />
        </van-cell-group>
        <div style="margin:15px;">
              <van-button color="#f30" block round @click="login">登录</van-button>      
        </div>
      
    </div>
</template>
<style >
 .van-nav-bar .van-icon{
     color:#777 !important;
 }
</style>
<script>
// 单击登录 把用户名存储到Cookie里面
//  从哪里跳转到登录页面的，登录成功后跳转回哪个页面
import Cookie from '../assets/js/Cookie';
export default {
    data(){
        return {
            uname:"",//用户名
            upwd:"",//密码
            }
    },
    methods:{
        login(){
            this.$http({
                method:"POST",
                url:"http://www.520mg.com/member/index_login.php",
                data:`fmdo=login&dopost=login&userid=${this.uname}&pwd=${this.upwd}`,
                configs:{withCredentials:true}
                // 允许跨域携带cookie                
            })
            .then(res=>{
                console.log(res.data);
                if(res.data.status==1){
                    this.$notify({ type: 'success', message: res.data.msg });
                    Cookie.setCookie("uname",this.uname);
                    let redirect = this.$route.query.redirect;
                    // 获取用户查询参数redirect值
                    // 当登录成功时候有redirect值则跳转到redirect对应的值
                    // 如果没有则跳转到用户页面
                    console.log("redirect",redirect);
                    if(redirect){
                        this.$router.replace(redirect);
                    }else{
                        this.$router.replace("/user");
                    }

                }else{
                    this.$notify({ type: 'danger', message: res.data.msg });
                }
            })        
           
        }
    }
}
</script>