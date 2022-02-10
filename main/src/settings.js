// 配置项
module.exports = {
  projectName: 'control_vehicle_frontend',

  projectTitle: '大型货车综合管控平台',

  projectTitleEn: 'comprehensive control platform for large trucks',

  projectFooter: '© 郑州聚凡科技有限公司',

  // 配合AutoDllPlugin插件使用：https://www.npmjs.com/package/autodll-webpack-plugin-plus
  entry: {
    // vue/dist/vue.esm.js
    vue: ['vue'],
    VueRouter: ['vue-router'],
    vuex: ['vuex'],
    axios: ['axios'],
    corejs: ['core-js'],
    filesaver: ['file-saver'],
    jscookie: ['js-cookie'],
    nprogress: ['nprogress'],
    pathtoregexp: ['path-to-regexp'],
    nodersa: ['node-rsa'],
    // xlsx: ['xlsx'],
    PlTable: ['pl-table']
  },

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: []
}
