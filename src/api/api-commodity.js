/**商品库存相关 */
import http from '../request/http'
import {goods} from './url'

export default{
    /**分页查询商品信息 */
    listPage(params){
        return http.get(goods.listPage,{params})
    },
    /**新增商品信息 */
    add(params){
        return http.post(goods.add,params)
    },
    /**通过ID查询商品信息 */
    one(params){
        return http.get(goods.one,{params})
    },
    /**修改商品信息 */
    upd(params){
        return http.post(goods.upd,params)
    },
    /**逻辑删除商品信息 */
    del(params){
        return http.get(goods.delete,{params})
    },
    /**查询首页商品展示数据 */
    listHome(params){
        return http.get(goods.listHome,{params})
    },

}