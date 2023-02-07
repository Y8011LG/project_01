<template>
    <div id="box">
        <div id="login">
            <form id="f1">
                <div class="wid">
                    <input type="text" placeholder="用户名" v-model="formObj.un" class="phone"/>                    
                </div>
                <div class="wid">
                    <input type="text" placeholder="密码" v-model="formObj.up" class="inputcode"/>
                </div>
                <div class="wid">
                    <input type="button" @click="login" value="登录" class="signin"/>
                </div>
                <div class="wid">
                    <el-row justify="end">
                        <el-col :span="3">
                            <el-link type="primary" @click="goRegister">注册</el-link>
                        </el-col>
                        <el-col :span="7">
                            <el-link icon="QuestionFilled" type="info" @click="goForgetPass">忘记密码</el-link>
                        </el-col>
                    </el-row>
                    
                    
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name:"",
    data() {
        return {
            formObj:{
                un:'admin',
                up:'admin'
            }
        }
    },
    methods:{
        login(){
            //非空验证
            if(this.formObj.un==='' || this.formObj.up===''){
                this.$message({
                    message:'用户名或密码不能为空',
                    type:'warning'
                })
                return
            }

            //准备参数
            const params={
                account:this.formObj.un,
                password:this.formObj.up,
                accountType:1
            }

            //向后端发送验证
            this.$http.apiUser.login(params).then(res=>{
                console.log(res);
                if(res.code==='1'){
                    //模拟将后台返回的token等数据存入vuex
                    this.$store.commit('user/setToken',res.data.access_token)
                    this.$store.commit('user/setUserName',res.data.user_name)

                    //判断是否有登录前待访问路径，没有则跳转主界面
                    let wantTo=this.$route.query.wantTo
                    if(wantTo){
                        this.$router.replace({path:wantTo})
                    }else{
                        this.$router.replace({path:'/main'})
                    }
                }else{
                    this.$message({
                        message:'用户名或密码不正确',
                        type:'error'
                    })
                }
            })

            
        },

        goRegister(){
            this.$router.push({path:'/register'})
        },
        goForgetPass(){
            this.$message({
                message:'骚年，这个功能还没开发',
                type:'error'
            })
        },
    },
}
</script>
<style scoped>
#box{
    background:url("../../../assets/login_bg.jpg");
    width:100%;	
    height:100%;
    position:fixed;
    background-size:100% 100%;
}
#login{
    width:500px;
    height:300px;
    border-radius:20px;
    opacity:.7;
    margin:0 auto;
    background-color:#C8C8C8;
    margin-top:50vh;
    transform: translateY(-50%);
    box-shadow:13px 11px 23px #000
}
#f1{
    padding-top:70px;
}
.wid{
    width:310px;
    margin:10px auto;
}
.wid .phone{
    width:300px;
    height:30px;
    padding-left: 5px;
    outline: none;
}
.wid .inputcode{
    width:300px;
    height:30px;
    padding-left: 5px;
    outline: none;
}
.wid .getcode{
    font-family:'微软雅黑','Helvetica Neue',Helvetica,Arial,sans-serif;
	font-size: 13px;
    width: 100px;
	height: 30px;
	line-height: 18px;
	padding: 3px 18px;
	display: inline-block;
	vertical-align: middle;
	font-weight: normal;
	border-radius: 2px;
	margin: 0 8px 0 13px;
	border: 1px solid #5aba1f;
	color: #ffffff;
	background-color: #5aba1f;
}
.wid .signin{
    font-family:'微软雅黑','Helvetica Neue',Helvetica,Arial,sans-serif;
	font-size: 13px;
    width: 300px;
	height: 30px;
	line-height: 18px;
	padding: 3px 18px;
	display: inline-block;
	vertical-align: middle;
	font-weight: normal;
	border-radius: 2px;
	margin: 0 8px 0 3px;
	border: 1px solid #3383da;
	color: #ffffff;
	background-color: #3383da;
}
</style>