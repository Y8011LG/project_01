import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import vuex from '@/store'

//路由配置表
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/admin/login/login.vue')
  },
  {
    path: '/register',
    component: () => import('../views/admin/register/register.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/main',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/admin/main/main.vue'),
    children: [
      {
        path:'',
        redirect:'/main/welcome'
      },
      {
        path: 'welcome',
        meta:{
          requiresAuth:true,
          isKeepAlive:true
        },
        component: () => import('../views/admin/welcome/welcome.vue')
      },
      {
        path: 'commodity',
        name:'Commodity',
        meta:{
          requiresAuth:true,
          isKeepAlive:true
        },
        component: () => import('../views/admin/commodity/commodity.vue')
      },
      {
        path: 'user',
        name:'User',
        meta:{
          requiresAuth:true,
          isKeepAlive:true
        },
        component: () => import('../views/admin/user/user.vue')
      },
      
    ]
  },
  
  /**无法匹配路由时 */
  { 
    path: '/:pathMatch(.*)*', 
    component: () => import('../views/admin/error/404.vue') 
  },
]

// 路由核心对象
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 注册全局前置路由守卫
router.beforeEach((to, from)=>{
  //获取vuex中token
  let token=vuex.state.user.token

  // 如果在登录状态且要去登录界面这是不允许的
  if(token && to.name==='Login'){
    return false
  }

  // 需要鉴权
  if(to.meta.requiresAuth){
    if(!token){
      //如果想去某个界面，但因为鉴权失败需要重新登录，此时可以通过传参方式，将想去的路径携带上
      return{
        path:'/login',
        query:{
          wantTo:to.path
        }
      }
    }
  }
  
  return true
})

export default router
