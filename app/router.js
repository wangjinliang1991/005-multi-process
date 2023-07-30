'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', 'api.index'); // 处理 GET 请求，返回欢迎信息
  router.post('/postdata', controller.home.postData); // 处理 POST 请求，返回 POST 请求的 JSON 数据
};

