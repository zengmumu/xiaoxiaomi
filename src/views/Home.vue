<template>
  <div class="home">

    <Header></Header>
    <van-tabs class="htabs" v-model="active" animated lazy-render title-active-color="#f30" @change="changeHd">
      <van-tab v-for="(item) in tabs" :title="item.name" :key="item.page_id">
        <Page :item="item"></Page>
      </van-tab>
    </van-tabs>    
  </div>
</template>
<style>
/* 顶部和导航区域固定-内容区域滚动 */
  .home{
    display: flex; 
    /* 弹性布局 */
    flex-direction: column; 
    /* 垂直方向 */
  }
  .htabs{
    flex:1;
    /* 自适应高 */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* 超出部分隐藏 */
  }
  .htabs .van-tabs__content{
    flex:1;
    /* 自适应高 */
    overflow: auto;
    scroll-behavior: smooth;
  }
</style>
<script> 
import Header from '../components/Header'
import Page from '@/components/Page.vue'
export default {
  name: 'Home',
  data(){return {
    active:0,// 当前选中的分类 默认第0个
    tabs:[],//分类tab数据
    }},
  created(){
    this.getPage();  // 当组件创建完毕 获取页面数
  },
  methods:{
    changeHd(){ // 单击找到页面滚动元素，设置滚动值为0
      let el = document.querySelector(".htabs .van-tabs__content");
      el.scrollTop = 0;
      // 每次单击页面回到最顶部
    },
    getPage(){
      this.$http.get("http://www.520mg.com/mi/page.php")
      .then(res=>{
        console.log(res.data);
        this.tabs = res.data.data.tabs;
        // ajax获取页面数据  设置tabs（分类）数据
      })
    }
 
 
 },
  components: {
   Header,Page
  }
}
</script>
