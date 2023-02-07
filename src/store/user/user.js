/**用户模块 */
export default{
    namespaced: true,//开启命名空间
    state:()=>({
       token:'',
       userName:''
    }),
    mutations:{
        setToken(state,params){
            state.token=params
        },
        setUserName(state,params){
            state.userName=params
        },
        clearAll(state){
            state.token=''
            state.userName=''
        },
    },
    actions:{},
    getters:{}
}