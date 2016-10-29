#Blog#

![演示图片][img-demo]

这是一个基于**Node.js**——**Express**框架的个人博客。支持解析**MarkDown**并生成静态HTML。

##系统架构##
![系统架构][img-systemstructure]

##特性##
博客前后端分离，系统构架实现了**层次化**、**组件化**。
###前端###
前端通过**Vue**+**Vuex**，实现了**组件化**。各组件相互配合，通过将各组件组合形成页面。

所有**Vue**组件保存在**public/javascripts/src/components**文件夹。
###后台###
后台基于**Node.js**的**Express**框架，分为**视图层**、**路由层**、**服务层**，其中视图层用于显示HTML页面，但考虑到其解析**Pug**模版带来的性能问题，改用静态HTML对其进行替换。

##配置##
配置文件保存在 **conf/conf.js**，其中包含**数据库**/**系统**等配置信息，所有信息均采用**JSON**格式存储。

##测试##
所有单元测试用例保存在**tests**文件夹，主要提供了对**Servers(服务层)**的测试。所有测试用例均以**xxx.test.js**格式命名。

单元测试由**Mocha**模块提供支持，进行单元测试请在**终端**中执行以下命令：
```
mocha 测试用例.test.js
```
##运行##
运行博客，请在配置好Node.js与Express框架及其他模块后，执行以下命令:
```
npm start bin/www
```
或者你也可以使用**Forver**、**PM2**等模块。

[img-demo]: ./docs/images/demo.png "演示图片"
[img-systemstructure]:./docs/images/system-structure.png "系统架构"

