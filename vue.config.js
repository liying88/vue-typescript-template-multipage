const path = require('path')
let glob = require('glob')
const name = 'Vue Typescript Admin'

/**
  * 配置pages多页面获取当前文件夹下的html和js
  */
const pages = {}
glob.sync('./src/pages/**/main.ts').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/main.ts')[0]
  pages[chunk] = {
    entry: path,
    template: 'public/index.html',
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
module.exports = {
  lintOnSave: false, //禁用eslint
  productionSourceMap: false,
  pages,
  devServer: {
    index: 'index.html', //默认启动serve 打开index页面
    open: process.platform === 'darwin',
    host: '',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => { }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    modules: false
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.limit = 100
        return options
      })
    Object.keys(pages).forEach(entryName => {
      config.plugins.delete(`prefetch-${entryName}`);
    });
    if (process.env.NODE_ENV === "production") {
      config.plugin("extract-css").tap(() => [{
        path: path.join(__dirname, "./dist"),
        filename: "css/[name].[contenthash:8].css"
      }]);
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.output = {
        path: path.join(__dirname, "./dist"),
        publicPath: "/",
        filename: "js/[name].[contenthash:8].js"
      };
    }
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  }
}
