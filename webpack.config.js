// node 内置
const path = require('path')
// webpack html 插件
const Htmlplugin = require('html-webpack-plugin')
// vue loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
   // 入口
  entry: './src/main.js',
  // 出口
  output: {
    filename: 'bundle.js', // 输出js文件名
    path: path.resolve(__dirname, 'dist') // 输出文件目录
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new Htmlplugin({
      filename: './index.html',
      minify: true, // 压缩
      inject: true, //注入
      template: './public/index.html', // 使用模板创建index.html
      // favicon: './public/favicon.ico', // favicon
      // title: 'test title',
      // meta: '...'
    }),
    // vue loader 插件
    new VueLoaderPlugin()
  ]
}