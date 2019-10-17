### develop
### 添加web 服务器，实时重新加载(live reloading)

> yarn add webpack-dev-server -D

> 启动：yarn dev

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
  ],
  devServer: {
    contentBase: './dist'
  }
}
```



<hr/>
> yarn add clean-webpack-plugin -D
清理 /dist 文件夹

```
// 引入
const cleanPlugin = require('clean-webpack-plugin')
// 在plugins中实例化
plugins: [
  new cleanPlugin(['dist])
]
```

### Manifest 
> webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪

> yarn add webpack-manifest-plugin -D

```
const ManifestPlugin = require('webpack-manifest-plugin')

plugins: [
  new ManifestPlugin()
  //new ManifestPlugin(options)
]
```
```
// https://github.com/danethurber/webpack-manifest-plugin

options.fileName
Type: String
Default: manifest.json

The manifest filename in your output directory.

options.publicPath
Type: String Default: output.publicPath

A path prefix that will be added to values of the manifest.

options.basePath
Type: String

A path prefix for all keys. Useful for including your output path in the manifest.

options.writeToFileEmit
Type: Boolean
Default: false

If set to true will emit to build folder and memory in combination with webpack-dev-server

options.seed
Type: Object
Default: {}

A cache of key/value pairs to used to seed the manifest. This may include a set of custom key/value pairs to include in your manifest, or may be used to combine manifests across compilations in multi-compiler mode. To combine manifests, pass a shared seed object to each compiler's ManifestPlugin instance.

options.filter
Type: Function(FileDescriptor): Boolean

Filter out files. FileDescriptor typings

options.map
Type: Function(FileDescriptor): FileDescriptor

Modify files details before the manifest is created. FileDescriptor typings

options.sort
Type: Function(FileDescriptor): number

Sort files before they are passed to generate. FileDescriptor typings

options.generate
Type: Function(Object, FileDescriptor, string[]): Object
Default: (seed, files, entrypoints) => files.reduce((manifest, {name, path}) => ({...manifest, [name]: path}), seed)

Create the manifest. It can return anything as long as it's serialisable by JSON.stringify. FileDescriptor typings

options.serialize
Type: Function(Object): string
Default: (manifest) => JSON.stringify(manifest, null, 2)

Output manifest file in different format then json (i.e. yaml).

FileDescriptor
FileDescriptor {
  path: string;
  name: string | null;
  isInitial: boolean;
  isChunk: boolean;
  chunk?: Chunk;
  isAsset: boolean;
  isModuleAsset: boolean;
}
chunk
Type: Chunk

Only available is isChunk is true

isInitial
Type: Boolean

Is required to run you app. Cannot be true if isChunk is false.

isModuleAsset
Type: Boolean

Is required by a module. Cannot be true if isAsset is false.
```
