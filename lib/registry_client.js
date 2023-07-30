const Base = require('sdk-base');
const sleep = require('mz-modules/sleep');
const moment = require('moment');

class RegistryClient extends Base {
  constructor(options) {
    super({
      // 指定异步启动的方法
      initMethod: 'init',
    });
    this._options = options;
  }

  /**
   * 启动逻辑
   */
  async init() {
    this.ready(true);
  }

  /**
   * 订阅
   * @param {Object} reg 
   *    - {String} dataId - the dataId
   * @param {Function} listener - the listener
   */
  subscribe(reg, listener) {
    const key = reg.dataId;
    this.on(key, listener);
  }

  /**
   * 发布
   * @param {Object} reg 
   *  - {String} dataId - the dataId
   *  - {String} publishData - the publish data
   */
  publish(reg) {
    const key = reg.dataId;
    this.emit(key, reg.publishData);
  }

  /**
   * 异步数据返回
   */
  async mockFetch(data) {
    await sleep(100);
    return {
      index: {
        data,
        modifiedBy: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    };
  }
}

module.exports = RegistryClient;