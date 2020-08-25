
config.security = {
    csrf: {
        enable: false
    },
    domainWhiteList: ['*'],
};
// add cors config here
config.cors = {
    origin: 'http://localhost:8080', // 访问白名单,根据你自己的需要进行设置
    credentials: true,  //允许Cook可以跨域,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
}
