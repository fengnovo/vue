# webpack-es6-vue-todolist

> 简单目录结构的webpack+es6+vue，项目用vue-cli初始化，项目生成器生成目录结构

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
  
参照https://github.com/vuejs-templates/webpack-simple 生成vue项目  
```  
$ npm install -g vue-cli
$ vue init webpack-simple my-project
$ cd my-project
$ npm install
$ npm run dev 
```
  
用components时，命名要相当注意  
Do not use built-in or reserved HTML elements as component id: Header  
是说vue保留字不能被命名
