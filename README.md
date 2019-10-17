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

### url-loader 
> 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理

# 使用预处理器sass
> yarn add sass-loader node-sass vue-style-loader -D
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
```

## 其他预处理器
Sass
例如，为了通过 Sass/SCSS 编译我们的 <style> 标签：

> npm install -D sass-loader node-sass
在你的 webpack 配置中：
```
module.exports = {
  module: {
    rules: [
      // ... 忽略其它规则

      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // 插件忽略
}
```
现在，除了能够 import 'style.scss'，我们还可以在 Vue 组件中使用 SCSS：

<style lang="scss">
/* 在这里撰写 SCSS */
</style>
这个块里的任何内容都会被 webpack 当作在一个 *.scss 文件中一样被处理。

#### Sass vs SCSS
注意 sass-loader 会默认处理不基于缩进的 scss 语法。为了使用基于缩进的 sass 语法，你需要向这个 loader 传递选项：
```
// webpack.config.js -> module.rules
{
  test: /\.sass$/,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        indentedSyntax: true
        // sass-loader version >= 8
        sassOptions: {
          indentedSyntax: true
        }
      }
    }
  ]
}
```
#### 共享全局变量
sass-loader 也支持一个 prependData 选项，这个选项允许你在所有被处理的文件之间共享常见的变量，而不需要显式地导入它们：
```
// webpack.config.js -> module.rules
{
  test: /\.scss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        // 你也可以从一个文件读取，例如 `variables.scss`
        // 如果 sass-loader 版本 < 8，这里使用 `data` 字段
        prependData: `$color: red;`
      }
    }
  ]
}
```
### Less
> npm install -D less less-loader
```
// webpack.config.js -> module.rules
{
  test: /\.less$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'less-loader'
  ]
}
```
#### Stylus
> npm install -D stylus stylus-loader
```
// webpack.config.js -> module.rules
{
  test: /\.styl(us)?$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'stylus-loader'
  ]
}
```
### PostCSS

Vue Loader v15 不再默认应用 PostCSS 变换。你需要通过 postcss-loader 使用 PostCSS。

> npm install -D postcss-loader
```
// webpack.config.js -> module.rules
{
  test: /\.css$/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
    'postcss-loader'
  ]
}
```
PostCSS 的配置可以通过 postcss.config.js 或 postcss-loader 选项来完成。其更多细节请查阅 postcss-loader 文档。

postcss-loader 也可以和上述其它预处理器结合使用。

#### Babel
> npm install -D babel-core babel-loader
```
// webpack.config.js -> module.rules
{
  test: /\.js?$/,
  loader: 'babel-loader'
}
```
Babel 的配置可以通过 .babelrc 或 babel-loader 选项来完成。

#### 排除 node_modules
exclude: /node_modules/ 在应用于 .js 文件的 JS 转译规则 (例如 babel-loader) 中是蛮常见的。鉴于 v15 中的推导变化，如果你导入一个 node_modules 内的 Vue 单文件组件，它的 <script> 部分在转译时将会被排除在外。

为了确保 JS 的转译应用到 node_modules 的 Vue 单文件组件，你需要通过使用一个排除函数将它们加入白名单：
```
{
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: file => (
    /node_modules/.test(file) &&
    !/\.vue\.js/.test(file)
  )
}
```
#### TypeScript
> npm install -D typescript ts-loader
```
// webpack.config.js
module.exports = {
  resolve: {
    // 将 `.ts` 添加为一个可解析的扩展名。
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      // ... 忽略其它规则
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      }
    ]
  },
  // ...plugin omitted
}
```
TypeScript 的配置可以通过 tsconfig.json 来完成。你也可以查阅 ts-loader 的文档。

#### Pug
模板的处理会稍微有些不同，因为绝大对数 webpack 的模板类 loader，诸如 pug-loader，会返回一个模板函数而不是一个编译好的 HTML 字符串。所以我们需要使用一个返回原始的 HTML 字符串的 loader，例如 pug-plain-loader，而不是使用 pug-loader。

> npm install -D pug pug-plain-loader
```
// webpack.config.js -> module.rules
{
  test: /\.pug$/,
  loader: 'pug-plain-loader'
}
然后你可以写：

<template lang="pug">
div
  h1 Hello world!
</template>
如果你还打算使用它在 JavaScript 中将 .pug 文件作为字符串导入，你需要在这个预处理 loader 之后链上 raw-loader。注意添加 raw-loader 会破坏 Vue 组件内的用法，所以你需要定义两条规则，其中一条指向使用了一个 resourceQuery 的 Vue 文件，另一条指向 (回退到) JavaScript 导入：

// webpack.config.js -> module.rules
{
  test: /\.pug$/,
  oneOf: [
    // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
    {
      resourceQuery: /^\?vue/,
      use: ['pug-plain-loader']
    },
    // 这条规则应用到 JavaScript 内的 pug 导入
    {
      use: ['raw-loader', 'pug-plain-loader']
    }
  ]
}
```