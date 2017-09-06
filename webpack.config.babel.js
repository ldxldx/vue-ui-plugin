let path = require('path');
let webpack = require('webpack');
/*
 extract-text-webpack-plugin插件，
 有了它就可以将你的样式提取到单独的css文件里
 */
let ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
 html-webpack-plugin插件，webpack中生成HTML的插件，
 具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
let HtmlWebpackPlugin = require('html-webpack-plugin');
/*
 一个根据模式匹配获取文件列表的node模块。
 有关glob的详细用法可以在这里看到——https://github.com/isaacs/node-glob
 */
let glob = require('glob');
/*
 webpack插件
 */
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//debug标示
import {CONFIG as projectConfig} from './src/js/lib/config';
let publicPath;
if (projectConfig.localEnv) {//如果是本地测试环境
    publicPath = '/dist/';
} else if (projectConfig.debugger) { //如果打包到测试环境
    publicPath = 'http://bkstage.zhaoyl.com/dist/';
} else {//如果打包到生产环境
    publicPath = 'http://bkstage.zhaoyl.com/dist/'
}
//IP地址
let serverHost = getIPAdress();
let config = {
    entry: {
        index: path.resolve(__dirname, 'src/js/page/index.js'),
        vendors: ['vue', 'vue-router','vue-resource','vuex'] // 需要进行单独打包的文件
    },
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/dist/',                //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js',            //每个页面对应的主js的生成配置
        chunkFilename: 'js/[name].asyncChunk.js?[chunkhash]'   //异步加载chunk name生成的配置
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015","stage-0"],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[hash].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/html/index.html'), //生成的html存放路径，相对于path
            template: path.resolve(__dirname, 'src/html/index.html'), //ejs模板路径,前面最好加上loader用于处理
            inject: 'body',  //js插入的位置，true/'head'/'body'/false
            chunks: ['load', 'vendors', 'vendor1', 'vendor2', 'index'],
            hash: true
        }),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            //name: ['vendors', 'vendor1', 'vendor2', 'load'], // 将公共模块提取，生成名为`vendors`的chunk
            minChunks: 2, //公共模块被使用的最小次数。配置为2，也就是同一个模块只有被2个以外的页面同时引用时才会被提取出来作为common chunks
            // children:true  //如果为true,那么公共组件的所有子依赖都将被选择进来
        }),
        //在async chunk 里面找到复用 >= 2次的模块再单独提取出来
        // new CommonsChunkPlugin({
        //     async: 'lazy',
        //     minChunks: (module, count) => ( //count 模块被复用的次数
        //         count >= 2
        //     )
        // }),
        //单独使用link标签加载css并设置路径，相对于output配置中的publicPath
        // new ExtractTextPlugin('styles.css'),
        projectConfig.debugger ? function () {
        } : new UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            except: ['$super', '$', 'exports', 'require', 'define', 'module'] //排除关键字
        })
    ],
    //使用webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, "/"),
        host: serverHost,
        port: 3030, //默认3030
        inline: true, //可以监控js变化
        hot: true//热启动
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions:['.js','.scss','.vue','.json']// 可以不加后缀, 直接使用 import xx from 'xx' 的语法
    }
};
module.exports = config;
/**
 * @description 获取本地IP地址
 * @returns {string|*}
 */
function getIPAdress() {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}