import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Category from '../views/Category.vue'
import User from '../views/User.vue'
import Produce from '../views/Produce.vue'
import NoMatch from '../views/NoMatch.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias:['/home','/main']
  },
  {
    path: '/produce/:id',
    name: 'Produce',
    component: Produce
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    // meta:{requireAuth:true}
  },
  {
    path:'/set',
    redirect:'/user'
  },
  {
    path:"/login",
    name:"Login",
    component:Login
  },
  {
    path: '/cat',
    name: 'Category',
    component:()=>import(/* webpackChunkName: "category" */'../views/Category.vue'),
    // meta:{requireAuth:true}
    // requireAuth是自定义的元信息，代表当前页面需要权限才能进入
    //  webpackChunkName: "category" 该组件单独划分为一个js文件，文件名为 category.js
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // 1. 当需要aboutjs时候浏览器才会加载about.js (按需加载)
    // 2. 当浏览器有下载空闲的时候回提前把about.js下载（prefetch 提前加载）
  },
  {
    path: '*',
    name: 'NoMatch',
    component: NoMatch
  },
  // 记得要导入NoMatch.vue
]
const router = new VueRouter({
  routes
})
import Cookie from '../assets/js/Cookie';
// 当进入到 购物车页面前判断用户是否登录，如果没有就跳转到 登录页面
router.beforeEach((to,from,next)=>{
  // console.log("to:",to);
  // console.log("from:",from);
  // 判断to的路由元信息是否需要权限
  if(to.meta.requireAuth){
    if(!Cookie.getCookie("uname")){
      // 如果没有用户名 那么跳转到登录
      next("/login?redirect="+to.path);
      // to.path要去页面的地址
    }else{
      // 否则 直接进入to页面
      next();
    }
  }else{
    next();
  }
  
})
export default router
