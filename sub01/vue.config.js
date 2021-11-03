const packageName = require('./package').name

// const publicPath = process.env.NODE_ENV === 'production' ? 'https://xxx/' : `http://localhost:${port}`

module.exports = {
  assetsDir: './',
  devServer: {
    port: process.env.VUE_APP_PORT,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  }
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('fonts')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .options({
  //       limit: 4096, // 小于4kb将会被打包成 base64
  //       fallback: {
  //         loader: 'file-loader',
  //         options: {
  //           name: 'fonts/[name].[hash:8].[ext]',
  //           publicPath
  //         }
  //       }
  //     })
  //     .end()
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .options({
  //       limit: 4096, // 小于4kb将会被打包成 base64
  //       fallback: {
  //         loader: 'file-loader',
  //         options: {
  //           name: 'img/[name].[hash:8].[ext]',
  //           publicPath
  //         }
  //       }
  //     })
  //}
}
