const ISDEV = process.env.NODE_ENV === 'development'
// node 内置
const path = require('path')
// webpack html 插件
const Htmlplugin = require('html-webpack-plugin')
// vue loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 开发环境
const devConf = {
  mode: 'development',
   // 出口
  output: {
    filename: '[name].js', // 输出js文件名
    path: path.resolve(__dirname, 'dist') // 输出文件目录
  },
  devtool: "source-map",
  devServer: {
    contentBase: './dist'
  }
}
// 生产环境
const prodConf = {
  mode: 'production',
   // 出口
  output: {
    filename: '[name].[hash:10].js', // 输出js文件名
    path: path.resolve(__dirname, 'dist') // 输出文件目录
  },

}

let baseConf = {
  // 入口
 entry: {
   // 多入口打包按顺序注入HTML
   main: './src/main.js', 
   // pageOne: './src/pageOne.js',
   // pageTwo: './src/pageTwo.js',
 },
  devServer: {
    contentBase: './dist'
  },
//  extensions: [".js", ".json", ".jsx", ".css"],
 module: {
   rules: [
     {
       test: /\.vue$/,
       loader: 'vue-loader'
     },
     {
      test: /\.j[s|sx]$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
     {
       test: /\.scss$/,
       use: [
         'vue-style-loader',
         'css-loader',
         'sass-loader'
       ]
     },
     {
       test: /\.(png|svg|jpeg|jpg|gif)$/,
       use: [
         'file-loader'
       ]
     },
     {
       test: /\.(woff|woff2|eot|ttf|otf)$/,
       use: [
         'file-loader'
       ]
     },
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

if (ISDEV) {
  Object.assign(baseConf, devConf)
} else {
  Object.assign(baseConf, prodConf)
}

module.exports = baseConf