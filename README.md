### webpack4

[https://juejin.im/entry/5c302140f265da611b587f99](https://juejin.im/entry/5c302140f265da611b587f99)
### 加速
```
1、缩小编译范围，减少不必要的编译工作，即 modules、mainFields、noParse、includes、exclude、alias全部用起来。
2、想要进一步提升编译速度，就要知道瓶颈在哪？通过测试，发现有两个阶段较慢：① babel 等 loaders 解析阶段；② js 压缩阶段。loader 解析稍后会讨论，而 js 压缩是发布编译的最后阶段，通常webpack需要卡好一会，这是因为压缩 JS 需要先将代码解析成 AST 语法树，然后需要根据复杂的规则去分析和处理 AST，最后将 AST 还原成 JS，这个过程涉及到大量计算，因此比较耗时。如下图，编译就看似卡住。
实际上，搭载 webpack-parallel-uglify-plugin 插件，这个过程可以倍速提升。我们都知道 node 是单线程的，但node能够fork子进程，基于此，webpack-parallel-uglify-plugin 能够把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，从而实现并发编译，进而大幅提升js压缩速度，如下是配置。
3、我们都知道，webpack打包时，有一些框架代码是基本不变的，比如说 babel-polyfill、vue、vue-router、vuex、axios、element-ui、fastclick 等，这些模块也有不小的 size，每次编译都要加载一遍，比较费时费力。使用 DLLPlugin 和 DLLReferencePlugin 插件，便可以将这些模块提前打包。

为了完成 dll 过程，我们需要准备一份新的webpack配置，即 webpack.dll.config.js。
4、面向tree-shaking，约束编码
sideEffects
从 webpack2 开始，tree-shaking 便用来消除无用模块，依赖的是 ES Module 的静态结构，同时通过在. babelrc 文件中设置 "modules": false 来开启无用的模块检测，相对粗暴。webapck4 灵活扩展了无用代码检测方式，主要通过在 package.json 文件中设置 sideEffects: false 来告诉编译器该项目或模块是 pure 的，可以进行无用模块删除，因此，开发公共组件时，可以尝试设置下
```
#### 新特性
```
webpack4 在大幅度提升编译效率同时，引入了多种新特性：

受 Parcel 启发，支持 0 配置启动项目，不再强制需要 webpack.config.js 配置文件，默认入口 ./src/ 目录，默认entry ./src/index.js ，默认输出 ./dist 目录，默认输出文件 ./dist/main.js。

开箱即用 WebAssembly，webpack4提供了wasm的支持，现在可以引入和导出任何一个 Webassembly 的模块，也可以写一个loader来引入C++、C和Rust。（注：WebAssembly 模块只能在异步chunks中使用）

提供mode属性，设置为 development 将获得最好的开发体验，设置为 production 将专注项目编译部署，比如说开启 Scope hoisting 和 Tree-shaking 功能。

全新的插件系统，提供了针对插件和钩子的新API，变化如下：

所有的 hook 由 hooks 对象统一管理，它将所有的hook作为可扩展的类属性
添加插件时，你需要提供一个名字
开发插件时，你可以选择插件的类型（sync/callback/promise之一）
通过 this.hooks = { myHook: new SyncHook(…) } 来注册hook
```
```
升级至webpack4后，一些默认插件由 optimization 配置替代了，如下：

CommonsChunkPlugin废弃，由 optimization.splitChunks 和 optimization.runtimeChunk 替代，前者拆分代码，后者提取runtime代码。原来的CommonsChunkPlugin产出模块时，会包含重复的代码，并且无法优化异步模块，minchunks的配置也较复杂，splitChunks解决了这个问题；另外，将 optimization.runtimeChunk 设置为true（或{name: “manifest”}），便能将入口模块中的runtime部分提取出来。
NoEmitOnErrorsPlugin 废弃，由 optimization.noEmitOnErrors 替代，生产环境默认开启。
NamedModulesPlugin 废弃，由 optimization.namedModules 替代，生产环境默认开启。
ModuleConcatenationPlugin 废弃，由 optimization.concatenateModules 替代，生产环境默认开启。
optimize.UglifyJsPlugin 废弃，由 optimization.minimize 替代，生产环境默认开启。
不仅如此，optimization 还提供了如下默认配置：
```
```
optimization: {
    minimize: env === 'production' ? true : false, // 开发环境不压缩
    splitChunks: {
        chunks: "async", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
        minSize: 30000, // 模块超过30k自动被抽离成公共模块
        minChunks: 1, // 模块被引用>=1次，便分割
        maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
        maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
        name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
        automaticNameDelimiter: '~', // 命名分隔符
        cacheGroups: { // 缓存组，会继承和覆盖splitChunks的配置
            default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                priority: -20, // 优先级
                reuseExistingChunk: true, // 默认使用已有的模块
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
                priority: -10
            }
        }
    }
}
```
```
splitChunks是拆包优化的重点，如果你的项目中包含 element-ui 等第三方组件（组件较大），建议单独拆包，如下所示。

splitChunks: {
    // ...
    cacheGroups: {    
        elementUI: {
            name: "chunk-elementUI", // 单独将 elementUI 拆包
            priority: 15, // 权重需大于其它缓存组
            test: /[\/]node_modules[\/]element-ui[\/]/
        }
    }
}
```
##### 升级避坑指南
```
webpack4不再支持Node 4，由于使用了JavaScript新语法，Webpack的创始人之一，Tobias，建议用户使用Node版本 >= 8.94，以便使用最优性能。

正式升级后，你可能会遇到各种各样的错误，其中，下面一些问题较为常见。

vue-loader v15 需要在 webpack 中添加 VueLoaderPlugin 插件，参考如下。

const { VueLoaderPlugin } = require("vue-loader"); // const VueLoaderPlugin = require("vue-loader/lib/plugin"); // 两者等同

//...
plugins: [
  new VueLoaderPlugin()
]
```
```
升级到 webpack4 后，mini-css-extract-plugin 替代 extract-text-webpack-plugin 成为css打包首选，相比之前，它有如下优势：

异步加载
不重复编译，性能更好
更容易使用
缺陷，不支持css热更新。因此需在开发环境引入 css-hot-loader，以便支持css热更新，如下所示：

{
    test: /\.scss$/,
    use: [
        ...(isDev ? ["css-hot-loader", "style-loader"] : [MiniCssExtractPlugin.loader]),
        "css-loader",
        postcss,
        "sass-loader"
    ]
}
发布到生产环境之前，css是需要优化压缩的，使用 optimize-css-assets-webpack-plugin 插件即可，如下。

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//...
plugins: [
    new OptimizeCssAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        }
    })
]
```



### 构建日志打印

```
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
apply(compiler) {
  compiler.hooks.run.tap(pluginName, compilation => {
    console.log("webpack 构建过程开始！");
  });
}

compiler为global上的全局属性，构建过程中可访问
```