'use strict';

const { Controller } = require('egg');

function isKeyUUID(key) {
  const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidPattern.test(key);
}


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async postData() {
    const data = this.ctx.request.body; // 获取 POST 请求的 JSON 数据


    for (const key in data) {
      if (data.hasOwnProperty(key) && isKeyUUID(key)) {
        delete data[key];
      }
    }

    this.ctx.body = data;
  }

   
}

module.exports = HomeController;
