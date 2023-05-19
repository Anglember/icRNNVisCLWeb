const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

require('./server/app.js')
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // webpack-dev-server 相关配置  
    devServer: {
        proxy: {
            '/api': { // api表示当前项目请求的key
                target: 'http://127.0.0.1:8081', // 代理服务器路径
                pathRewrite: {
                    '^/api': '/'
                }, // 重写路径
                changeOrigin: true
            }
        },
        host: '0.0.0.0',
        disableHostCheck: true

    },

    chainWebpack: config => {
        config.module
            .rule('svg')
            .uses.clear()
        config.module
            .rule('svg1')
            .test(/\.svg$/)
            .use('svg-sprite')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
            .include
            .add(resolve('src/icons'))
            .end()
        // config.module
        //     .rule('css')
        //     .test(/\.css$/)
        //     .use('style-loader!css-loader!stylus-loader')
        //     .loader('style-loader!css-loader!stylus-loader')
        //     .end()

    }


}