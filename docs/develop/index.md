# 开发指南

项目分为三个模块，core核心模块是C++编写的判题机，frontend是基于Vue2的前端，backend是基于Nodejs的后端。推荐使用“适用于Linux的Windows子系统”简称WSL的WSL2版本安装Ubuntu环境，配合Visual Studio Code以及其Remote WSL插件进行本地的跨平台开发。在配置好环境后使用git工具clone仓库，并在三个内执模块行`npm install`指令就可以配置好项目。三个模块的运行测试指令有所不同，可以参照对应目录下的package.json来查看运行与测试指令。

## 核心模块 Core
Core 核心模块是一个判题机，它具有接受程序题代码题解、编译、运行和使用预先指定的输入输出与用户代码执行输出进行比对来进行判题，并记录用户程序运行占用系统资源情况的功能。在技术上，Core 核心模块使用基于[node-addon-api](https://github.com/nodejs/node-addon-api)的Node Addon插件技术。核心模块是使用C++编写的，并使用node-gyp工具编译为“.node”格式的node插件，该插件可以直接被运行在Node.js上的Javascript代码引入并调用。进一步对平台进行开发需要到下列技术相关知识：
* JavaScript
* Node.js
* C/C++ Language
* node-addon-api
* Linux programming(有一本叫APUE的书可以参考)

## 前端 Frontend
Frontend是一个基于Vue和Vuetify框架的前端单页应用模块。Vue作为数据管理与模块化框架，Vuetify是一个基于我最喜欢的材料设计的UI框架。前端模块中使用了以下技术：
* ECMAScript 6(Promise, spread syntax...)
* Vue 2
* Vue Router
* Vuex
* Vue i18n
* Vuetify 2
* axios
* markdown it
* highlight.js
* katex
* Ace Editor

### 前端文件结构
```
frontend
└───api       一个对axios的封装来做mock等功能 
└───assets    静态文件
└───components  进一步封装的ui组件
└───locale    国际化i18n相关
└───plugins   Vuetify, highlight.js, notify, markdown-it, Ace plugins
└───router    Vue Router 路由
└───store     Vuex 储存 
└───style     全局样式. 颜色主题在plugins/theme.js里定义
└───utils     一些用于验证或者其他用途的工具函数 
└───views     主要的视图组件，是构成App.vue的模块，也是对components里ui组件的封装
└───App.vue   主要的应用组件
└───index.html  模板html 
└───index.js  入口文件
```

## 后端 Backend
后端是一个普通的基于Koa.js与MongoDB的Node.js程序。后端是负责主要系统逻辑和数据持久化的部分。它就像其他项目的后端那样对外提供一个RESTful API允许客户端（通常为前端）进行请求获取数据。它对内，在需要的时候会调用判题机插件进行判题。后端使用到了以下技术
* Koa
* MongoDB
* Mongoose（MongoDB的对象关系映射框架）
* Winston

### 后端文件结构
```
backend
└───config      后端配置。服务器、数据库、日志等
└───core        存放判题机核心node模块
└───db          数据库连接核心文件
└───model       数据实体，定义Mongoose中Schema与Model的地方
└───router      请求控制器，Koa路由位置
└───security    安全相关
└───util        系统常量、错误、字段验证等
```