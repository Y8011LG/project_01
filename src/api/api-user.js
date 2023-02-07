/**用户业务 */
import http from '../request/http'
import {user} from './url'

export default{
    /**登录*/
    login(params){
        return http.get(user.login,{params})
    },
    /**注册 */
    add(params){
        return http.post(user.add,params)
    },
    /**查询用户名是否注册过 */
    accountCount(params){
        return http.get(user.accountCount,{params})
    },
}