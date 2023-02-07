<template>
    <div class="box">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12" style="margin-bottom:20px">
                <h2 class="center">欢迎注册</h2>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="9">
                <el-form label-width="80px">
                    <el-form-item label="账号">
                        <el-input @blur="checkUserName" maxlength="15" clearable show-word-limit v-model="formData.username"/>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formData.userpass" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="formData.confimpass" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input maxlength="4" clearable show-word-limit v-model="formData.name"/>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="2">
                <el-button type="success" round size="small" @click="doReg">确认注册</el-button>
            </el-col>
            <el-col :span="3">
                <el-link type="info" @click="goLogin">已有账号，去登录</el-link>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data:function(){
        return{
            formData:{
                username:'',
                userpass:'',
                confimpass:'',
                name:'',
                birthday:'',
            },
        }
    },
    methods:{
        checkUserName(){
            //准备参数
            const params={
                account:this.formData.username
            }

            //发送到后端进行验证
            this.$http.apiUser.accountCount(params).then(res=>{
                if(res.code !=='1'){
                    this.formData.username=''
                    this.$message({
                        message:res.msg,
                        type:'warning'
                    })
                }
            })
        },
        doReg(){
            if(this.formData.username==='' || this.formData.userpass==='' || this.formData.name==='' || this.formData.birthday===''){
                this.$message({
                    message:'您有内容没有填写',
                    type:'warning'
                })
                return
            }

            

        },
        goLogin(){
            this.$router.replace({path:'/login'})
        },
    },
}
</script>
<style scoped>
.center{
    text-align: center;
}
</style>