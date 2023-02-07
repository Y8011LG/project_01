/**axios封装 */
import axios from 'axios'
/**此处无法访问vue实例，所以必须单独导入以下内容 */
import router from '@/router/'
import vuex from '@/store'

/**配置项 */
const options={
    timeout: 1000 * 12
}

/**创建新实例 */
const instance=axios.create(options)

/**请求拦截器 */
instance.interceptors.request.use(
    config=>{
        //携带token
        let token=vuex.state.user.token
        token&&(config.headers.token = token)
        return config
    },
    error=>{
        console.error('请求拦截器捕获错误',error);
    }
)

/**响应拦截器 */
instance.interceptors.response.use(
    response=>Promise.resolve(response.data), 
    error=>{
        const { response } = error
        if(response){
            //统一错误处理业务逻辑
            errorHandle(response.status,response.data)
            return Promise.reject(response)
        }
    }
)

/**响应错误统一处理 */
 const errorHandle = (status, data) => {
    switch (status) {
        case 403://没有权限
            toLogin(data)
            break
        default://其它错误
            toError(data)
            break
    }
}

/**跳转到登录界面 */
const toLogin=(params)=>{
    router.push({path:'/login'})
}

/**其它错误 */
const toError=(params)=>{
    //后续讲完路由进一步处理
}


export default instance