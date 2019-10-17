### 创建项目
> mkdir demo
> npm init -y
...

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
