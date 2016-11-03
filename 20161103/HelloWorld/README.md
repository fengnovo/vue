# 说明  
本例子是根据 http://www.jianshu.com/p/78c9e5342990 文／劳卜（简书作者）博客自动化生成的一个HelloWorld项目  
# 入门基础  
## Vue实例  
在一个html文件中，我们直接可以通过script标签引入Vue.js，然后就可以在页面里写Vue.js代码了。上图中我们通过new Vue()构建了一个Vue的实例，在实例中，可以包含挂在元素（el），数据（data），模板（template），方法（methods）与生命周期钩子（created等）等选项。不同的实例选项拥有不同的功能，如：  
（1）el表明我们的Vue需要操作哪一个元素下的区域，'#demo'表示操作id为demo的元素下区域。  
（2）data表示Vue 实例的数据对象，data 的属性能够响应数据的变化。  
（3）created表示实例生命周期中创建完成的那一步，当实例已经创建完成之后将调用其方法。     
## Vue常用指令  
在Vue项目的开发中，我们使用的最多的应该就属Vue的指令了。通过Vue提供的常用指令，我们可以淋漓尽致地发挥Vue数据驱动的强大功能。以下便是图中常用指令的简单介绍：  
（1）v-text: 用于更新绑定元素中的内容，类似于jQuery的text()方法  
（2）v-html: 用于更新绑定元素中的html内容，类似于jQuery的html()方法  
（3）v-if: 用于根据表达式的值的真假条件渲染元素  
（4）v-show: 用于根据表达式的值的真假条件显示隐藏元素
（5）v-for: 用于遍历数据渲染元素或模板  
（6）v-on: 用于在元素上绑定事件  
  
关于更多的Vue指令可以查看Vue2.0文档，地址：[vue指令](https://vuefe.cn/api/#指令)  
## Vue.js技术栈    
除了Vue.js我们还需要用到：  
（1）vue-cli：Vue的脚手架工具，用于自动生成Vue项目的目录及文件。  
（2）vue-router： Vue提供的前端路由工具，利用其我们实现页面的路由控制，局部刷新及按需加载，构建单页应用，实现前后端分离。  
（3）vuex：Vue提供的状态管理工具，用于同一管理我们项目中各种数据的交互和重用，存储我们需要用到数据对象。  
（4）ES6：Javascript的新版本，ECMAScript6的简称。利用ES6我们可以简化我们的JS代码，同时利用其提供的强大功能来快速实现JS逻辑。  
（5）NPM：node.js的包管理工具，用于同一管理我们前端项目中需要用到的包、插件、工具、命令等，便于开发和维护。  
（6）webpack：一款强大的文件打包工具，可以将我们的前端项目文件同一打包压缩至js中，并且可以通过vue-loader等加载器实现语法转化与加载。  
（7）Babel：一款将ES6代码转化为浏览器兼容的ES5代码的插件  
## vue-cli构建  
在使用vue-cli之前我们需要安装node.js，利用其提供的npm命令来安装vue-cli。安装node.js只需去其官网下载软件并安装即可，地址为：https://nodejs.org/en/  
安装完成之后我们打开电脑的cmd命令行工具依次输入上图中的命令：  
（1）npm install -g vue-cli：全局安装vue-cli  
（2）vue init webpack my-project: 利用vue-cli在目录地址生成一个基于webpack的名为’my-project‘的Vue项目文件及目录  
（3）cd my-project：打开刚刚创建的文件夹  
（4）npm intall：安装项目所依赖的包文件  
（5）npm run dev：利用本地node服务器在浏览器中打开并浏览项目页面  






# hello-world

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
