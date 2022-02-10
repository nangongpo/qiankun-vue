module.exports = {
  outputDir: '../dist/main',
  productionSourceMap: false,
  devServer: {
    port: 30000,
    proxy: {
      '/mock/api': {
        target: process.env.VUE_APP_API_URL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mock/api': ''
        }
      }
    }
  },
  css: {
    extract: process.env.NODE_ENV !== 'development',
    sourceMap: false,
    loaderOptions: {
      // 注意：在 sass-loader v8 中，这个选项名是 "prependData", 更高版本使用additionalData
      scss: {
        prependData: `@import "~@/styles/variables.scss";@import "~@/styles/mixin.scss";`
      }
    }
  }
}
