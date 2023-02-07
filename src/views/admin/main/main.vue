<!--  -->
<template>
    <div>
        <el-container>
            <!--左侧导航栏开始-->
            <el-aside class="left" :width="asideWidth">
                <el-scrollbar>
                    <el-menu @select="menuHandler" style="border-right:none;" :router="true" :collapse="isCollapse" background-color="#5b6f88" text-color="#bfcbd9">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon><coffee /></el-icon>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item :route="{path:'/main/commodity',title:'商品信息'}" index="1-1"><el-icon><notebook /></el-icon>商品信息</el-menu-item>
                        </el-sub-menu>
                       <el-sub-menu index="2">
                            <template #title>
                                <el-icon><View/></el-icon>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item :route="{path:'/main/user',title:'用户信息'}" index="2-1"><el-icon><DataAnalysis /></el-icon>用户信息</el-menu-item>
                      </el-sub-menu>
                   </el-menu>
                </el-scrollbar>
            </el-aside>
            <!--左侧导航栏结束-->

            <!--右侧分栏开始-->
            <el-container>
                <!--右侧顶部区域-->
                <el-header class="head" height="45px">
                    <el-row>
                        <el-col :span="12" class="head-l"> 
                            <el-icon @click="isCollapse=!isCollapse" style="cursor: pointer;">
                                <expand v-if="isCollapse" />
                                <fold v-else />
                            </el-icon>
                            斗金商品管理平台
                        </el-col>
                        <el-col :span="12" class="head-r">
                            <el-badge :value="unReadInfoTotal" :max="99" class="unReadInfo">
                                <el-link type="warning">未读消息</el-link>
                            </el-badge>
                            <el-dropdown @command="dropdownHandler">
                                <span class="el-dropdown-link" style="cursor: pointer;">
                                    <el-icon style="top:2px;"><avatar /></el-icon>
                                    {{user.userName}}
                                    <el-icon style="top:2px;" class="el-icon--right"><arrow-down-bold /></el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="repass">修改密码</el-dropdown-item>
                                        <el-dropdown-item command="detail">账号详情</el-dropdown-item>
                                        <el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </el-header>

                <!--右侧主要内容区域-->
                <el-main style="height:0;flex-grow:1;"> 
                    <el-tabs v-model="this.$store.state.tabs.activeIndex" 
                        type="card"
                        @tab-click="tabClick"
                        @tab-remove="tabRemove">
                        <el-tab-pane label="首页" name="/main">
                            <router-view v-slot="{ Component,route }">
                                <keep-alive v-if="route.meta.isKeepAlive" :key="route.path">
                                    <component :is="Component" />
                                </keep-alive>
                                <component :is="Component" v-else />
                            </router-view>
                        </el-tab-pane>
                        <el-tab-pane 
                            v-for="(item,index) in this.$store.state.tabs.openTab" :key="index"
                            :label="item.title"
                            :name="item.path"
                            :closable="true">
                            <router-view v-slot="{ Component,route }">
                                <keep-alive v-if="route.meta.isKeepAlive" :key="route.path">
                                    <component :is="Component" />
                                </keep-alive>
                                <component :is="Component" v-else />
                            </router-view>    
                        </el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
            <!--右侧分栏结束-->
        </el-container>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:"",
    data() {
        return {
            isCollapse:false,//是否收起侧边栏
            unReadInfo:[
                {title:'请假单',count:30},
                {title:'报关单',count:1},
                {title:'送修单',count:100},
            ]
        }
    },
    created() {
        
    },
    mounted() {

    },
    computed:{
        ...mapState({
            user:state => state.user
        }),
        unReadInfoTotal(){
            let num=0
            for(let item of this.unReadInfo){
                num+=item.count
            }
            return num
        },
        //折叠菜单aside宽度变化监控
        asideWidth(){
            return this.isCollapse?'65px':'200px'
        },
    },
    methods:{
        menuHandler(index,indexPath,item,routeResult){
            //预留点击菜单同时动态添加选项卡时的处理
            //console.log('item',item.route);

            //判断是否已经打开选项了，如果已经打开，就直接激活
            let isOpen=this.$store.getters['tabs/findTab'](item.route.path)

            if(isOpen===-1){
                //调用vuex的方法，进行选项数据的插入
                this.$store.commit('tabs/add_tab',item.route)
            }
            
            //调用vuex的方法，进行激活选项卡动作
            this.$store.commit('tabs/active_tab',item.route.path)
            //执行路由跳转,可以不写
            //this.$router.replace({path:item.route.path})
        },
        dropdownHandler(command){
            console.log(command);
            switch(command){
                case 'exit':
                    this.loginOut()
                    break
                case 'repass':
                    this.$message('骚年，该功能996模式完成中');
                    break
                case 'detail':
                    this.$message('骚年，该功能996模式完成中');
                    break
                default:
                    break
            }
        },
        loginOut(){
            this.$store.commit('user/clearAll')
            //退出到登录界面
            this.$router.push({path:'/login'})
        },
        /**选项卡点击 */
        tabClick(params){
            //调用vuex的方法，进行激活选项卡动作
            this.$store.commit('tabs/active_tab',params.props.name)

            //激活所点击选项卡对应的路由
            this.$router.push({path:params.props.name})
        },
        /**选项卡删除 */
        tabRemove(tabPanelName){
            //首页不删除,其实首页未提供删除按钮，此句可以不要
            if(tabPanelName==='/main'){
                return
            }

            //调用vuex中删除tab的方法
            this.$store.commit('tabs/remove_tab',tabPanelName)

            //判断待删除tab是否处于激活状态
            if(tabPanelName===this.$store.state.tabs.activeIndex){
                //判断还有没有别的选项卡内容（注意首页不在openTab中）
                if(this.$store.state.tabs.openTab && this.$store.state.tabs.openTab.length>=1){
                    //修改当前激活选项卡为数组最后一个元素值
                    this.$store.commit('tabs/active_tab',this.$store.state.tabs.openTab[this.$store.state.tabs.openTab.length-1].path)
                    //执行路由跳转
                    this.$router.push({path: this.$store.state.tabs.activeIndex});
                }else{
                    //路由展示无值时，设置激活路径为默认路径
                    this.$store.commit('tabs/active_tab','/main')

                    //路由展示没值时，跳回首页
                    this.$router.push({path: '/main'});
                }
            }
        },
    },
}
</script>
<style scoped>
.el-main{
    padding-top: 3px;
    padding-left: 10px;
}
.hand{
    cursor: pointer;
}
.head {
  background-color: #409eff;
  padding-top: 10px;
  color: #fff;
}

.head .head-l{
    font-size: 18px;
    font-weight: bold;
}
.head .head-r{
    font-size: 18px;
    text-align: right;
}

.left {
  background-color: #5b6f88;
  height: 100vh;
}

.unReadInfo{
    display: inline-block; 
    margin-right: 30px;
}
.el-dropdown{
    margin-top: 8px;
}


</style>