module.exports = {
    devServer: {
        open: true, //浏览器自动打开页面
        host: "localhost", //本地服务器访问的路径
        port: 8080, //本地服务器访问的端口
        proxy: {
            '/feiyan': {
                //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
                //同一个域名只能设置一次跨域，否则重复报错！
                target: 'https://iflow-api.uc.cn',
                changeOrigin: true, //是否跨域，设置为true;(必须)
            },
            // 当用户去访问 http://localhost:8080/feiyan/xxx的时候
            // 咱们的本地服务器器就会去访问 https://iflow-api.uc.cn/feiyan/xxx
            // 让把拿到的数据返回给用户（ajax请求）
            //  这种方法让我们能在开发环境请求下，跨域访问数据。
            "/web":{
                target: 'https://m.9ji.com/',
                changeOrigin: true, //是否跨域，设置为true;(必须)
            },
            
            "/recommend":{
                target:'https://api.hongbeibang.com/',
                changeOrigin:true
            },
            // 开发模式 跨域请求
           

        }
    },

    publicPath: './'
}

