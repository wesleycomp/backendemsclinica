"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Empresa = _interopRequireDefault(require("../../../empresa/typeorm/entities/Empresa"));
var _User = _interopRequireDefault(require("../../../users/typeorm/entities/User"));
var _FechamentoAso = _interopRequireDefault(require("./FechamentoAso"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
let Fechamento = (_dec = (0, _typeorm.Entity)('fechamento'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.ManyToOne)(() => _Empresa.default), _dec7 = (0, _typeorm.JoinColumn)({
  name: 'empresa_id'
}), _dec8 = Reflect.metadata("design:type", typeof _Empresa.default === "undefined" ? Object : _Empresa.default), _dec9 = (0, _typeorm.Column)({
  type: 'date'
}), _dec0 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec1 = (0, _typeorm.Column)({
  type: 'date'
}), _dec10 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec11 = (0, _typeorm.Column)(), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.ManyToOne)(() => _User.default), _dec14 = (0, _typeorm.JoinColumn)({
  name: 'criado_por'
}), _dec15 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec16 = (0, _typeorm.Column)({
  type: 'numeric',
  precision: 12,
  scale: 2,
  default: 0
}), _dec17 = Reflect.metadata("design:type", Number), _dec18 = (0, _typeorm.Column)({
  type: 'varchar',
  length: 20,
  default: 'aberto'
}), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.Column)({
  type: 'numeric',
  precision: 12,
  scale: 2,
  default: 0
}), _dec21 = Reflect.metadata("design:type", Number), _dec22 = (0, _typeorm.Column)({
  type: 'date',
  nullable: true
}), _dec23 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec24 = (0, _typeorm.Column)({
  type: 'timestamp',
  nullable: true
}), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec26 = (0, _typeorm.Column)({
  type: 'varchar',
  length: 255,
  nullable: true
}), _dec27 = Reflect.metadata("design:type", String), _dec28 = (0, _typeorm.CreateDateColumn)(), _dec29 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec30 = (0, _typeorm.UpdateDateColumn)(), _dec31 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec32 = (0, _typeorm.OneToMany)(() => _FechamentoAso.default, fa => fa.fechamento, {
  cascade: true
}), _dec33 = Reflect.metadata("design:type", Array), _dec(_class = (_class2 = class Fechamento {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "empresa_id", _descriptor2, this);
    _initializerDefineProperty(this, "empresa", _descriptor3, this);
    _initializerDefineProperty(this, "data_inicial", _descriptor4, this);
    _initializerDefineProperty(this, "data_final", _descriptor5, this);
    _initializerDefineProperty(this, "criado_por", _descriptor6, this);
    _initializerDefineProperty(this, "usuario", _descriptor7, this);
    _initializerDefineProperty(this, "valor_total", _descriptor8, this);
    _initializerDefineProperty(this, "status", _descriptor9, this);
    // aberto | parcialmente_pago | pago | cancelado
    _initializerDefineProperty(this, "valor_pago", _descriptor0, this);
    _initializerDefineProperty(this, "data_fechamento", _descriptor1, this);
    _initializerDefineProperty(this, "data_pagamento", _descriptor10, this);
    _initializerDefineProperty(this, "observacao", _descriptor11, this);
    _initializerDefineProperty(this, "created_at", _descriptor12, this);
    _initializerDefineProperty(this, "updated_at", _descriptor13, this);
    _initializerDefineProperty(this, "asos", _descriptor14, this);
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "empresa_id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "empresa", [_dec6, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "data_inicial", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "data_final", [_dec1, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "criado_por", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "usuario", [_dec13, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "valor_total", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "valor_pago", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "data_fechamento", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "data_pagamento", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "observacao", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "asos", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class);
var _default = exports.default = Fechamento;