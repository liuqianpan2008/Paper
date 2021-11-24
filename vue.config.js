module.exports = {
    publicPath: './',
    lintOnSave: true,
    configureWebpack: {
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
