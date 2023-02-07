import { createStore } from 'vuex'
//vuex数据缓存插件
import createPersistedState from "vuex-persistedstate"

//导入选项卡模块
import tabs from './tabs/tabs'
import user from './user/user'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    tabs,
    user,
  },
  //vuex的数据缓存
  plugins:[
    createPersistedState({
      storage:window.sessionStorage,//默认存储在localStorage中
      reducer(state){
        return{
             tabs:state.tabs,
             user:state.user,
        }
      }
    }),
  ]
})
