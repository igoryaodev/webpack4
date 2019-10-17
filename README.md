### 创建项目
> mkdir demo && npm init -y

>...

### 文件目录
```
.
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.vue
│   └── main.js
├── webpack.config.js
└── yarn.lock
```
### 安装(本地安装)
> yarn add webpack webpack-cli -D

> yarn add vue ... -S


### 配置JS部分
```
//webpack.config.js

const path = require('path')

module.exports = {
  // 入口
  entry: './src/main.js',
  // 出口
  output: {
    filename: 'bundle.js', // 输出js文件名
    path: path.resolve(__dirname, 'dist') // 输出文件目录
  }
}

```

### 加载.vue
> https://vue-loader.vuejs.org/

> yarn add vue-loader vue-template-compiler -D
```
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
```

### 使用yarn start打包构建，然后在浏览器中打开demo/dist/index.html，页面显示App.vue中的内容

### 载入.css
> yarn add css-loader style-loader -D

```
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
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
```

### 载入图片、字体
>yarn add file-loader -D

```
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
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
```