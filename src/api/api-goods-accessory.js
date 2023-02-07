/**商品附件相关 */
import http from '@/request/http'
import {goodsAccessory} from './url'

export default {
    /**查询商品对应附件,get{gid:xxx} */
    list(params){
        return http.get(goodsAccessory.list,{params})
    },
    /**删除对应附件 */
    delete(params){
        return http.get(goodsAccessory.delete,{params})
    },
}