const sleep = require('mz-modules/sleep');
const moment = require('moment');

const Service = require('egg').Service;

let memoryCache = {};

class Source extends Service {
  get(key) {
    return memoryCache[key];
  }

  async update(data) {
    // update memory cache from remote
    memoryCache = await mockFetch(data);
    this.ctx.logger.info('update memory cache from remote: %j', memoryCache);
  }
}

module.exports = Source;

async function mockFetch(data) {
  await sleep(100);
  return {
    index: {
      data,
      modifiedBy: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
  };
}