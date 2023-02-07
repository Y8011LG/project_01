/**用户相关 */
export const user={
    login:'/api/sysUser/login',//登录,get,{account,accountType:1或2,password}
    add:'/api/sysUser/add',//注册post{account,password，accountType:1,name}
    accountCount:'/api/sysUser/getAccountCount',//验证账号是否已注册,get{account}
    listPage:'/api/sysUser/getListPage',//分页查询用户数据

}

/**商品类别相关 */
export const goodsType={
    list:'/api/goodsType/getList',//商品类别数据,get
}

/**商品相关 */
export const goods={
    add:'/api/goodsBook/add',//新增商品 post{name:商品名称,gtype:分类id,press:出版社，price:单价,author:作者,amount:库存数量,details:详情}
    listPage:'/api/goodsBook/getListPage',//分页查询商品,get{pageIndex,pageSize}
    one:'/api/goodsBook/getOne',//通过ID查询商品分类,get{id}
    upd:'/api/goodsBook/upd',//修改商品,post{id:主键,name:商品名称,gtype:分类id,press:出版社，price:单价,author:作者,amount:库存数量,details:详情}
    delete:'/api/goodsBook/delete',//逻辑删除商品get,{id:xxx}
    listHome:'/api/goodsBook/getListHome',//首页商品信息，get,无参数
}

/**附件相关 */
export const goodsAccessory={
    list:'/api/goodsAccessory/getList',
    add:'/api/goodsAccessory/add',
    delete:'/api/goodsAccessory/delete'
}
