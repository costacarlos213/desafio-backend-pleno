"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CronScheduler = void 0;

var _nodeCron = _interopRequireDefault(require("node-cron"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CronScheduler {
  constructor(callback) {
    this.callback = callback;
  }

  execute(interval) {
    const task = _nodeCron.default.schedule(interval, async () => {
      return await this.callback();
    }, {
      scheduled: false
    });

    return task;
  }

}

exports.CronScheduler = CronScheduler;