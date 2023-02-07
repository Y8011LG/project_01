export default{
    namespaced: true,//开启命名空间
    state:()=>({
        openTab:[],//所有打开的路由{title:'测试',path:'/xxx/xx'}
        activeIndex:'/main' , //当前激活的选项卡对应路由路径
    }),
    mutations:{
        /**添加选项卡数据 */
        add_tab(state,params){
            state.openTab.push(params)
        },
        /**删除选项卡数据 */
        remove_tab(state,path){
            state.openTab.splice(state.openTab.findIndex(item=>item.path===path),1)
        },
        /**激活选项卡 */
        active_tab(state,path){
            state.activeIndex=path
        },
    },
    actions:{},
    getters:{
        /**通过path属性值判断是否选项卡已经打开 */
        findTab:state=>path=>state.openTab.findIndex(item=>item.path===path),
    }
}