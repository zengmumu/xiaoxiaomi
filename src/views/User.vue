<template>
    <div>
        <div class="ucard">
            <div class="pic">
                <van-icon name="user-circle-o" size=".5rem" color="#fff"></van-icon>
            </div>
            <div class="umsg">
                <p v-if="uname">欢迎回来 {{uname}} | <span @click="logOut">注销</span></p>
                <p v-else>游客请 <span  @click="$router.push('/login?redirect=/user')"> 登录</span> </p>
            </div>
        </div>
        
    </div>
</template>
<style>
    .ucard{
        padding: 15px;
        color:#fff;
        background-color:orange;
        display: flex;
    }
    .umsg{
        flex:1;
        margin-left: 15px;
    }
    .umsg span{ text-decoration: underline;}
    
</style>
<script>
import Cookie from '../assets/js/Cookie';
export default {
    data(){return {uname:''}},
    created(){
        this.uname = Cookie.getCookie("uname");
    },
    methods:{
        logOut(){
            this.$http({
                method:"POST",
                url:"http://www.520mg.com/member/index_login.php",
                data:"dopost=exit",
                configs:{withCredentials:true}
            })
            .then(res=>{
                if(res.data.status==1){
                     Cookie.delCookie("uname");
                     this.uname='';
                    this.$toast.success('注销成功');
                }else{
                    this.$toast.fail('注销失败');
                }
            })
           
        }
    }
}
</script>