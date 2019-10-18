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

### 配置html
> yarn add html-webpack-plugin -D

```
// node 内置
const path = require('path')
// webpack html 插件
const Htmlplugin = require('html-webpack-plugin')

module.exports = {
   // 入口
   entry: './src/main.js',
   // 出口
   output: {
     filename: 'bundle.js', // 输出js文件名
     path: path.resolve(__dirname, 'dist') // 输出文件目录
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
    })
  ]
}
```

### 构建
> yarn start / npm run start

### vue项目编译打包
> 配置文档https://vue-loader.vuejs.org/

需引入的插件
> yarn add vue-loader vue-template-compiler -D

> 对应文档及分支 webpack-vue

### 使用预处理器sass的配置项目

需引入的插件
> yarn add sass-loader node-sass vue-style-loader -D


> 对应文档及分支 webpack-vue-sass

### 其他静态文件的配置项目（图片、音视频、字体等）
需引入的插件
> yarn add file-loader -D

或
> yarn add url-loader -D

> 对应文档及分支 webpack-other-assets

### 添加web 服务器，实时重新加载(live reloading)

> yarn add webpack-dev-server -D

> 对应文档及分支 webpack-develop

