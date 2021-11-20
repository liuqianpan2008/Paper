module.exports = {
    publicPath: './',
    lintOnSave: true,
    configureWebpack: {
        //关闭 webpack 的性能提示
        performance: {
            hints:false
        }
    
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1/houduan',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': ''//重写,
                }
            }
        }
    }
}
