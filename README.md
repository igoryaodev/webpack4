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

### git使用

```
git push -d origin branchName // 删除远程分支

git checkout -b newBranchName // 新建本地分支

git push -u origin branchName // 本地新分支

git branch -d <BranchName>// 删除本地分支

// 推送本地代码到已有仓库
1、创建.git
git init // 本地无.git，有则先删除.git
2、关联远程仓库master分支
git remote add origin https://..... <远程仓库地址>
3、同步远程仓库master分支
git pull origin master
4、添加本地所有代码
git add .
5、提交本地代码到暂存区
git commit -m 'first commit'
6、推送到远程仓库
git push -u origin master

// 新建远程分支
1 新建本地分支
git checkout -b newBranchName

2 推送到远程仓库
git push -u origin branchName



```
```
查看分支
git branch / git branch -r

切换分支
git checkout branchName

拉取/同步远程仓库
git pull

// git 配置信息

// 用户信息
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
// 查看配置信息
// 要检查已有的配置信息，可以使用 git config --list 命令
```