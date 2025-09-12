"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Empresa = _interopRequireDefault(require("../../../empresa/typeorm/entities/Empresa"));
var _Exame = _interopRequireDefault(require("../../../exame/typeorm/entities/Exame"));
var _typeorm = require("typeorm");
var _User = _interopRequireDefault(require("../../../users/typeorm/entities/User"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10, _descriptor11;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
let ConvenioEmpresa = (_dec = (0, _typeorm.Entity)('convenioempresa'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.ManyToOne)(() => _Empresa.default), _dec5 = (0, _typeorm.JoinColumn)({
  name: 'empresa_id'
}), _dec6 = Reflect.metadata("design:type", typeof _Empresa.default === "undefined" ? Object : _Empresa.default), _dec7 = (0, _typeorm.Column)(), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeorm.ManyToOne)(() => _Exame.default), _dec0 = (0, _typeorm.JoinColumn)({
  name: 'exame_id'
}), _dec1 = Reflect.metadata("design:type", typeof _Exame.default === "undefined" ? Object : _Exame.default), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.ManyToOne)(() => _User.default), _dec13 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec14 = Reflect.metadata("design:type", typeof _Exame.default === "undefined" ? Object : _Exame.default), _dec15 = (0, _typeorm.Column)(), _dec16 = Reflect.metadata("design:type", String), _dec17 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 10,
  scale: 2,
  default: 0
}), _dec18 = Reflect.metadata("design:type", Number), _dec19 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 10,
  scale: 2,
  default: 0
}), _dec20 = Reflect.metadata("design:type", Number), _dec21 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 10,
  scale: 2,
  default: 0
}), _dec22 = Reflect.metadata("design:type", Number), _dec23 = (0, _typeorm.Column)(), _dec24 = Reflect.metadata("design:type", Boolean), _dec25 = (0, _typeorm.CreateDateColumn)(), _dec26 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec27 = (0, _typeorm.UpdateDateColumn)(), _dec28 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class ConvenioEmpresa {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "empresa", _descriptor2, this);
    _initializerDefineProperty(this, "empresa_id", _descriptor3, this);
    _initializerDefineProperty(this, "exame", _descriptor4, this);
    _initializerDefineProperty(this, "exame_id", _descriptor5, this);
    _initializerDefineProperty(this, "user", _descriptor6, this);
    _initializerDefineProperty(this, "user_id", _descriptor7, this);
    _initializerDefineProperty(this, "valorexame", _descriptor8, this);
    _initializerDefineProperty(this, "valormedico", _descriptor9, this);
    _initializerDefineProperty(this, "valorems", _descriptor0, this);
    _initializerDefineProperty(this, "ativo", _descriptor1, this);
    _initializerDefineProperty(this, "created_at", _descriptor10, this);
    _initializerDefineProperty(this, "updated_at", _descriptor11, this);
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "empresa", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "empresa_id", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "exame", [_dec9, _dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "exame_id", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "valorexame", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "valormedico", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "valorems", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "ativo", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class);
var _default = exports.default = ConvenioEmpresa;