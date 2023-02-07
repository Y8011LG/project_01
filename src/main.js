import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/** 引入公用样式*/
import '@/assets/base.css'

/**引入api统一入口,注意默认导入了index.js */
import api from '@/api'

/**引入element-plus相关 */
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'

const app=createApp(App)

/**vue3.3中不需要配置，用来解决依赖注入时双引号问题 */
app.config.unwrapInjectedRef = true

/**将api业务放入全局实例 */
app.config.globalProperties.$http=api

/**全局注册ep图标 */
for(let iconName in ElIcons){
    app.component(iconName,ElIcons[iconName])
}

/**使用插件 */
app.use(store)
app.use(router)
app.use(ElementPlus,{ locale: zhCn,})

/**挂载 */
app.mount('#app')

