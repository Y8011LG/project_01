const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //基本路径
  publicPath:"/",
  //构建时的输出路径
  outputDir:"dist",
  //放置静态资源的目录
  assetsDir:"assets",
  //html的输出路径
  indexPath:"index.html",
  //文件名哈希
  filenameHashing:true,
  //服务环境
  devServer: {
      open: true,
      host: 'localhost',
      port: 8081,
      https: false,
      proxy: { // 设置代理
          '/api': {
              target: 'http://localhost:9001',// 后台接口域名
              changeOrigin: true,//是否跨域
              pathRewrite: {
                  '^/api': '/api'
              }
          }
      }
  }
})
