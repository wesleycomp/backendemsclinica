"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ContaBancaria = _interopRequireDefault(require("../../../contabancaria/typeorm/entities/ContaBancaria"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
let Despesa = exports.default = (_dec = (0, _typeorm.Entity)("despesas"), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)("uuid"), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  type: "uuid",
  nullable: true
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)({
  type: "uuid",
  nullable: true
}), _dec9 = Reflect.metadata("design:type", String), _dec0 = (0, _typeorm.Column)({
  length: 200
}), _dec1 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)({
  type: "varchar",
  length: 60,
  nullable: true,
  default: null
}), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)({
  type: "date",
  nullable: true,
  default: null
}), _dec13 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec14 = (0, _typeorm.Column)({
  type: "date",
  nullable: true,
  default: null
}), _dec15 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec16 = (0, _typeorm.Column)({
  type: "date",
  nullable: true
}), _dec17 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec18 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 14,
  scale: 2,
  default: 0
}), _dec19 = Reflect.metadata("design:type", Number), _dec20 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 14,
  scale: 2,
  default: 0
}), _dec21 = Reflect.metadata("design:type", Number), _dec22 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 14,
  scale: 2,
  default: 0
}), _dec23 = Reflect.metadata("design:type", Number), _dec24 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 14,
  scale: 2,
  default: 0
}), _dec25 = Reflect.metadata("design:type", Number), _dec26 = (0, _typeorm.Column)({
  type: "decimal",
  precision: 14,
  scale: 2,
  default: 0
}), _dec27 = Reflect.metadata("design:type", Number), _dec28 = (0, _typeorm.Column)({
  type: "uuid",
  nullable: true
}), _dec29 = Reflect.metadata("design:type", String), _dec30 = (0, _typeorm.Column)({
  type: "int",
  default: 1
}), _dec31 = Reflect.metadata("design:type", Number), _dec32 = (0, _typeorm.Column)({
  type: "varchar",
  length: 10,
  default: "ABERTA"
}), _dec33 = Reflect.metadata("design:type", String), _dec34 = (0, _typeorm.Column)({
  type: "uuid",
  nullable: true
}), _dec35 = Reflect.metadata("design:type", String), _dec36 = (0, _typeorm.ManyToOne)(() => _ContaBancaria.default, conta => conta.despesas, {
  nullable: true
}), _dec37 = (0, _typeorm.JoinColumn)({
  name: "conta_bancaria_id"
}), _dec38 = Reflect.metadata("design:type", typeof _ContaBancaria.default === "undefined" ? Object : _ContaBancaria.default), _dec39 = (0, _typeorm.Column)({
  type: "varchar",
  length: 255,
  nullable: true
}), _dec40 = Reflect.metadata("design:type", String), _dec41 = (0, _typeorm.CreateDateColumn)(), _dec42 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec43 = (0, _typeorm.UpdateDateColumn)(), _dec44 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class Despesa {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "fornecedor_id", _descriptor2, this);
    _initializerDefineProperty(this, "centro_custo_id", _descriptor3, this);
    _initializerDefineProperty(this, "categoria_id", _descriptor4, this);
    _initializerDefineProperty(this, "descricao", _descriptor5, this);
    _initializerDefineProperty(this, "documento", _descriptor6, this);
    _initializerDefineProperty(this, "data_emissao", _descriptor7, this);
    _initializerDefineProperty(this, "data_vencimento", _descriptor8, this);
    _initializerDefineProperty(this, "data_pagamento", _descriptor9, this);
    // 👈 adicionado
    _initializerDefineProperty(this, "valor_total", _descriptor0, this);
    _initializerDefineProperty(this, "valor_pago", _descriptor1, this);
    _initializerDefineProperty(this, "desconto", _descriptor10, this);
    _initializerDefineProperty(this, "valor_inicial", _descriptor11, this);
    _initializerDefineProperty(this, "juros", _descriptor12, this);
    _initializerDefineProperty(this, "forma_pagamento_id", _descriptor13, this);
    _initializerDefineProperty(this, "numero_parcelas", _descriptor14, this);
    _initializerDefineProperty(this, "status", _descriptor15, this);
    // ABERTA | PARCIAL | PAGA | CANCELADA
    // 🔹 Relação com ContaBancaria
    _initializerDefineProperty(this, "conta_bancaria_id", _descriptor16, this);
    _initializerDefineProperty(this, "conta_bancaria", _descriptor17, this);
    // 🔹 Observação
    _initializerDefineProperty(this, "observacao", _descriptor18, this);
    _initializerDefineProperty(this, "created_at", _descriptor19, this);
    _initializerDefineProperty(this, "updated_at", _descriptor20, this);
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "fornecedor_id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "centro_custo_id", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "categoria_id", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "descricao", [_dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "documento", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "data_emissao", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "data_vencimento", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "data_pagamento", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "valor_total", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "valor_pago", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "desconto", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "valor_inicial", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "juros", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "forma_pagamento_id", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "numero_parcelas", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "conta_bancaria_id", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "conta_bancaria", [_dec36, _dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "observacao", [_dec39, _dec40], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec41, _dec42], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec43, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class);