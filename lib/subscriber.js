'use strict';

const EventEmitter = require('events');

module.exports = class Subscriber extends EventEmitter {
  constructor() {
    super();
    this._start();
    this.index = 0;
  }

  _start() {
    const interval = Math.random() * 5000 + 5000;
    setTimeout(() => {
      this.emit('changed', this.index++);
      this._start();
    }, interval);
  }
};