/**商品分类 */
import http from '../request/http'
import {goodsType} from './url'

export default{
    /**查询商品分类 */
    list(params){
        return http.get(goodsType.list,{params})
    },
}