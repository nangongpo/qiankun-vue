module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 30000,
    proxy: {
      '/api': {
        target: 'http://localhost:30000', //路径指向本地主机地址及端口号
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/mock' //路径转发代理
        }
      }
    }
  }
}
