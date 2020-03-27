import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 
// 各组件相互共享数据的插件
import {Toast} from 'vant';
import { Dialog } from 'vant';
import axios from 'axios';
export default new Vuex.Store({
  state: {
    // 真的数据要从服务器 ajax获取
    // goods:[{"buy_limit":5,"img_url":"//i8.mifile.cn/v1/a1/ef617fac-7489-436d-b74e-c43582f09633.jpg","num":1,"price":899,"name":"\u5c0f\u7c73\u7535\u89c64A 32\u82f1\u5bf8","goods_id":2172700021,"select":true},{"buy_limit":1,"img_url":"//i8.mifile.cn/v1/a1/65be1bac-6d3f-3766-3bac-c11b3aa13b8e.webp","num":1,"price":1199,"name":"Redmi Note 7 4GB+64GB \u68a6\u5e7b\u84dd","goods_id":2185200032,"select":true},{"buy_limit":5,"img_url":"//i8.mifile.cn/a1/pms_1514387870.88251945.jpg","num":1,"price":3599,"name":"\u5c0f\u7c73\u7b14\u8bb0\u672cAir 12.5  4G 128G \u94f6\u8272","goods_id":2175200001,"select":true}]
    goods:[],
  },
  getters:{
    // 总数：所有的购物车商品被选中的，num值之和
    allNum(state){
      let num = 0;
      state.goods.forEach(item=>{
        if(item.select){
          num += parseInt(item.num);
        }
      })
      return num;
    },
    // 总价格
    allPrice(state){
      let num = 0;
      state.goods.forEach(item=>{
        if(item.select){
          num += parseInt(item.num)*item.price;
        }
      })
      return num;
    }
  },
  //数据存放地方
  mutations: {   
    // 初始化 购物车数据
    initCart(state,data){
      state.goods = data;
    },
    delCart(state,data){
      Dialog.confirm({
        title: '真的吗?',
        message: '您确定要删除该商品'
      }).then(() => {
        // on confirm
          let index = state.goods.indexOf(data);
          state.goods.splice(index,1);

      }).catch(() => {
        // on cancel
      });
    },
    addToCart(state,data){
    // data里面的name是否和 goods里面的各项的name重复，如果goods里面有该名称 只修改num+1 
    // 如果num值超过了buy_limit num等于buylimit
    //  否则 采用unshift 添加data
    let canUnshift = true;//是否可以直接添加
    state.goods.forEach(item=>{
      if(item.name==data.name){
        // 遍历goods里面的每项，如果名称相同num数据加data.num
        item.num =parseInt(item.num)+parseInt(data.num);
        if(item.num>item.buy_limit){
          item.num = item.buy_limit;  //如果超过最大可购买量，等于最大可购买量
          Toast.fail("最多可购买"+item.buy_limit+"件商品");
        }
        canUnshift = false; //如果名字相同就不能重复添加
      }
      
    })
    if(canUnshift){  //如果可以添加再添加
      state.goods.unshift(data);
    }
   
    }
  },
  // 方法存放地方
  actions: {
    // 在actions里面发起ajax 获取数据
    getCart(context){
      axios.get("http://www.520mg.com/mi/cart.php")
      .then(res=>{
        context.commit("initCart",res.data);
        // 获取数据后 执行 mutation里面的 initCart 初始化 购物车数据
      })
    }
  },
  // 反复存放地地方（可以执行ajax）
  modules: {
  }
  // 模块
})
