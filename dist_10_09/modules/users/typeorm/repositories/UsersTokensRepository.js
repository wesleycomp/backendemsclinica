"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UsersTokensRepository = void 0;
var _typeorm = require("typeorm");
var _UserToken = _interopRequireDefault(require("../entities/UserToken"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let UsersTokensRepository = exports.UsersTokensRepository = (_dec = (0, _typeorm.EntityRepository)(_UserToken.default), _dec(_class = class UsersTokensRepository extends _typeorm.Repository {
  async findByToken(token) {
    const UserToken = await this.findOne({
      where: {
        token
      }
    });
    return UserToken;
  }
  async generate(user_id) {
    const userToken = await this.create({
      user_id
    });
    await this.save(userToken);
    return userToken;
  }
}) || _class);
var _default = exports.default = UsersTokensRepository;