const { createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
    
    const targetApi = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://your-production-api.com';

    app.use(
        '/api',
        createProxyMiddleware({
            target:targetApi,
            changeOrigin:true,
        })
    ),
    app.use(
        '/oauth',
        createProxyMiddleware({
            target:"https://kauth.kakao.com",
            changeOrigin:true,
        })
    ),
    app.use(
        '/v2',
        createProxyMiddleware({
            target:"https://kapi.kakao.com",
            changeOrigin:true,
        })
    )
    app.use(
        '/v1',
        createProxyMiddleware({
            target:"https://kapi.kakao.com",
            changeOrigin:true,
        })
    )
}