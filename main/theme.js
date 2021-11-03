/* eslint-disable no-undef */

const et = require('element-theme')

// 生成样式变量文件
et.init('./src/styles/theme.scss')

// 实时编译
et.watch({
  config: './src/styles/theme.scss',
  out: './src/theme'
})

et.run({
  out: './src/theme',
  config: './src/styles/theme.scss',
  minimize: false,
  browsers: ['ie >= 9', 'chrome >= 32', 'last 2 versions']
})
