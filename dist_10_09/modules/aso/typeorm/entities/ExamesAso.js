"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Exame = _interopRequireDefault(require("../../../exame/typeorm/entities/Exame"));
var _TipoPagamento = _interopRequireDefault(require("../../../tipopagamento/typeorm/entities/TipoPagamento"));
var _typeorm = require("typeorm");
var _Aso = _interopRequireDefault(require("./Aso"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
let ExameAso = (_dec = (0, _typeorm.Entity)('exameaso'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.ManyToOne)(() => _Aso.default), _dec5 = (0, _typeorm.JoinColumn)({
  name: 'aso_id'
}), _dec6 = Reflect.metadata("design:type", typeof _Aso.default === "undefined" ? Object : _Aso.default), _dec7 = (0, _typeorm.Column)(), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeorm.ManyToOne)(() => _Exame.default), _dec0 = (0, _typeorm.JoinColumn)({
  name: 'exame_id'
}), _dec1 = Reflect.metadata("design:type", typeof _Exame.default === "undefined" ? Object : _Exame.default), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)({
  nullable: true
}), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.Column)({
  nullable: true
}), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.ManyToOne)(() => _TipoPagamento.default), _dec17 = (0, _typeorm.JoinColumn)({
  name: 'tipopagamento_id'
}), _dec18 = Reflect.metadata("design:type", typeof _TipoPagamento.default === "undefined" ? Object : _TipoPagamento.default), _dec19 = (0, _typeorm.Column)(), _dec20 = Reflect.metadata("design:type", String), _dec21 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 10,
  scale: 2,
  default: 0
}), _dec22 = Reflect.metadata("design:type", Number), _dec23 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 10,
  scale: 2,
  default: 0
}), _dec24 = Reflect.metadata("design:type", Number), _dec25 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 10,
  scale: 2,
  default: 0
}), _dec26 = Reflect.metadata("design:type", Number), _dec27 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 10,
  scale: 2,
  default: 0
}), _dec28 = Reflect.metadata("design:type", Number), _dec29 = (0, _typeorm.Column)({
  nullable: true
}), _dec30 = Reflect.metadata("design:type", Boolean), _dec31 = (0, _typeorm.Column)({
  nullable: true
}), _dec32 = Reflect.metadata("design:type", Boolean), _dec33 = (0, _typeorm.CreateDateColumn)(), _dec34 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec35 = (0, _typeorm.UpdateDateColumn)(), _dec36 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec37 = (0, _typeorm.Column)({
  type: 'date',
  default: () => 'NOW()'
}), _dec38 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class ExameAso {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "aso", _descriptor2, this);
    _initializerDefineProperty(this, "aso_id", _descriptor3, this);
    _initializerDefineProperty(this, "exame", _descriptor4, this);
    _initializerDefineProperty(this, "exame_id", _descriptor5, this);
    _initializerDefineProperty(this, "user_id", _descriptor6, this);
    _initializerDefineProperty(this, "user_desconto", _descriptor7, this);
    _initializerDefineProperty(this, "tipopagamento", _descriptor8, this);
    _initializerDefineProperty(this, "tipopagamento_id", _descriptor9, this);
    _initializerDefineProperty(this, "valorexamesemdesconto", _descriptor0, this);
    _initializerDefineProperty(this, "valorexame", _descriptor1, this);
    _initializerDefineProperty(this, "valormedico", _descriptor10, this);
    _initializerDefineProperty(this, "valorems", _descriptor11, this);
    _initializerDefineProperty(this, "ativo", _descriptor12, this);
    _initializerDefineProperty(this, "desconto", _descriptor13, this);
    _initializerDefineProperty(this, "created_at", _descriptor14, this);
    _initializerDefineProperty(this, "updated_at", _descriptor15, this);
    _initializerDefineProperty(this, "data_cadastro_exame", _descriptor16, this);
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "aso", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "aso_id", [_dec7, _dec8], {
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
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user_desconto", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "tipopagamento", [_dec16, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "tipopagamento_id", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "valorexamesemdesconto", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "valorexame", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "valormedico", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "valorems", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "ativo", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "desconto", [_dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec35, _dec36], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "data_cadastro_exame", [_dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class);
var _default = exports.default = ExameAso;