"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ioredis = _interopRequireDefault(require("ioredis"));
var _cache = _interopRequireDefault(require("../../config/cache"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RedisCache {
  constructor() {
    this.client = void 0;
    this.client = new _ioredis.default(_cache.default.config.redis);
  }
  async save(key, value) {
    // console.log(key, value);
    await this.client.set(key, JSON.stringify(value));
  }
  async recover(Key) {
    const data = await this.client.get(Key);
    if (!data) {
      return null;
    }
    const parseData = JSON.parse(data);
    return parseData;
  }
  async invalidate(key) {
    await this.client.del(key);
  }
}
exports.default = RedisCache;