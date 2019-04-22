const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
    css: [],
    js: [
        'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    ]
}

function resolve(dir) {
    return path.join(__dirname, dir)
}

const srcFltPath = 'html存放地址/front/index.html';
const srcStaticPath = '静态资源存放地址/front';

module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === "development" ? "./" : "front",
    // 输出文件目录
    outputDir: process.env.NODE_ENV === "development" ? "dist" : path.resolve(__dirname, srcStaticPath),
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // assetsDir: "./",
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    indexPath: process.env.NODE_ENV === "development" ? "./" : path.resolve(__dirname, srcFltPath),
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false, // 可恶的eslint,千万不要开启
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config
            .entry('index')
            .add('babel-polyfill')
            .end();
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@img", resolve("src/assets/images"))
            .set("@css", resolve("src/assets/styles/css"))
            .set("@scss", resolve("src/assets/styles/scss"))
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            return {
                plugins: [
                    //生产环境自动删除console
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: {
                                warnings: false,
                                drop_debugger: true,
                                drop_console: true
                            }
                        }
                    })
                ]
            }
        } else {
            // 为开发环境修改配置...
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    devServer: {
        port: 8888,
        open: true, // 自动开启浏览器
        compress: true, // 开启压缩
        overlay: {
            warnings: true,
            errors: true
        }
    },
}