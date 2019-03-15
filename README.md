<h1 align="center">eye-admin 开发须知</h1>

## 技术栈及使用要求
> 1. 基于Vue全家桶 + axios + typescript + element-ui + scss + webpack4构建的企业级应用项目;
> 2. 开发时请确保你已了解或掌握以上技术要求,然后你就可以愉快的玩耍了;项目包含些许彩蛋(bug),<a href="mailto:914743765@qq.com" title="我的邮箱地址">欢迎交流!!!</a>;

## 从新建项目到设置打包环境
```
1. vue create eye-admin
2. 新建 vue.config.js 文件，设置baseUrl: './'
3. 新建各个环境的文件，例如：.env.development .env.test .env.production
4. 在 package.json 中设置打包命令，例如：build:development build:test build:production，在执行命令的语句中设置 mode 环境，例如：--mode test
```

## 关于环境变量的注意事项
* 环境名应该与环境文件统一
* 环境文件放置根目录下
* 除了 `baseUrl` 和 `NODE_ENV` 其他环境变量使用 VUE_APP 开头
* 本项目设定了生产测试环境 `t-eye` 和 `s-eye`;
* 另外还设定本地运行环境`local`,你可以在项目拉取下来后补充 `.env.local.development` 文件,并添加如下信息并替换你自己所在服务器的域名及端口;
例如 :
    NODE_ENV='development'
    VUE_APP_URL='http://localhost:8080'  

##  vue 文件中 TS 上下文顺序
```
- data
- @Prop
- @State
- @Getter
- @Action
- @Mutation
- @Watch
- 生命周期钩子
    - beforeCreate（按照生命周期钩子从上到下）
    - created
    - beforeMount
    - mounted
    - beforeUpdate
    - updated
    - activated
    - deactivated
    - beforeDestroy
    - destroyed
    - errorCaptured（最后一个生命周期钩子）
- 路由钩子
    - beforeRouteEnter
    - beforeRouteUpdate
    - beforeRouteLeave
- computed
- methods
- 组件引用，mixins，filters 等放在 @Component 里面
```

## 工程目录结构
```bash
src：项目源码。开发的时候代码写在这里。
 |--api # 服务层ajax请求服务
 |    |--index # api数据入口文件
 |--assets # 项目静态资源
 |--axios # axios封装请求//拦截配置
 |    |--config.ts # axios拦截器配置文件
 |    |--service,ts # axios请求配置文件
 |--components # 项目公共组件库
 |--element-theme # element-ui配置文件
 |    |--index.scss # 主题配置文件
 |    |--element.js # 组件引入配置文件
 |--router # 项目路由
 |    |--index.ts # 入口及路由初始化
 |    |--config # 路由操作方法的封装
 |    |--filterRouter # 页面路由文件
 |--store # 基于Vuex的状态管理模块
 |    |--index.ts # 入口及store初始化
 |    |--modules # 子模块的store对象
 |    |    |--diagnosis.ts # 诊断详情模块
 |    |    |--patient.ts # 患者模块
 |--utils # 公共库函数
 |    |--index.ts # 常用工具类的入口文件
 |    |--bridgeFrame.ts # 跨页面操作
 |    |--components.ts # 公共组件引用入口
 |    |--constant.ts # 常量数据
 |    |--decorator.ts # 装饰器
 |    |--directive.ts # 基于vue的全局指令
 |    |--dom.ts # 用于操作dom的方法
 |    |--eventBus.ts # 挂载一个全局的vue实例
 |    |--filters.ts # 基于vue的全局过滤器
 |    |--fundebug.ts # 异常捕获,发送错误日志
 |    |--lesionStatics.ts # 关于lesion的一些方法封装
 |    |--validator.ts # 校验方法的封装
 |    |--zoomer.js # 封装影像操作的插件
 |--views # 项目应用页面，根据应用需要，还可以有子页面，各子页面目录结构和顶级子页面类似
 |    |--components # 页面级公共组件
 |    |--layouts # 页面框架
 |    |--diagnosis # 诊断详情
 |    |    |--component # 诊断详情公共模块
 |    |    |--mr-anno # 多病种本地阅片
 |    |    |--rt-anno # 多病种远程阅片
 |    |    |--review-result # 转远程后查看远程阅片详情
 |    |    |--viewer # 查看大图
 |    |--outpatient # 门诊页面
 |    |--patient # 患者页面
 |    |--version # 版本信息
 |    |--zoom # 视频会议
 |--App.vue # 项目根视图
 |--main.ts # 项目入口文件
 |--mixin.loading.ts # loading的mixin文件

 ```

## 页面结构
单词小写，单词之间用 '-' 分隔，如图

<div align="center">
    <img src="statics/pakeage.jpg"  alt="项目目录结构" />
</div>

## 使用

### 使用命令行
```bash
$ git clone git@git.vistel.cn:web/eyewisdom-frontend.git
$ cd eyewisdom-frontend
$ npm install
$ npm run serve         # 访问 http://localhost:8080
$ npm run build         # Compiles and minifies for production
$ npm run lint          # Lints and fixes files
$ npm run test:unit     # Run your unit tests
```

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions