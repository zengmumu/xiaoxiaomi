<template>
    <div class="header">
        <a href="" class="logo">
            <img src="./../assets/logo.png" height="18" alt="">
        </a>
        <input type="text">
        <div class="btn">
            <img src="./../assets/user.png" height="22" alt="">
        </div>
    </div>
</template>
<script>
export default {    
}
</script>
<style >
    .header{
        line-height: 44px;
        height: 44px;
        /* 设置高与行高 */
        background-color: #f0f0f0;
        /* 背景色 */
        display: flex;
        /* 弹性布局 */
        align-items: center;
        /* 内容垂直居中对对齐 */
        width: 100%;
    }
    .btn,
    .logo{
        height: 44px;
        width: 44px;
        /* 设置高宽 */
        display: flex;
        /* 弹性布局 */
        align-items: center;
        /* 内容垂直居中 */
        justify-content: center;
        /* 内容水平居中 */
        
    }
    .header input{
        flex:1;
        /* 在弹性布局下自适应宽 */
        border:0;
        /* 去掉边框 */
        line-height: 29px;
        /* 设置高与行高29 */
    }
</style>