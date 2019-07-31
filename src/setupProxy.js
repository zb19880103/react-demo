const proxy = require('http-proxy-middleware')
let ip = '172.16.21.150';
let target = 'http://' + ip + ':80';
module.exports = function (app) {
  app.use(proxy('/api/web/', {
    target: target,
    pathRewrite: {'^/api/web/': '/api/web/'},
    changeOrigin: true
  }));
  app.use(proxy('/api/', {
    target: target,
    pathRewrite: {'^/api': '/api'},
    changeOrigin: true
  }));
};
