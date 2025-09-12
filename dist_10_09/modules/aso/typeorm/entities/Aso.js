"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Empresa = _interopRequireDefault(require("../../../empresa/typeorm/entities/Empresa"));
var _Funcao = _interopRequireDefault(require("../../../funcao/typeorm/entities/Funcao"));
var _Medico = _interopRequireDefault(require("../../../medico/typeorm/entities/Medico"));
var _Paciente = _interopRequireDefault(require("../../../paciente/typeorm/entities/Paciente"));
var _typeorm = require("typeorm");
var _TipoAso = _interopRequireDefault(require("./TipoAso"));
var _User = _interopRequireDefault(require("../../../users/typeorm/entities/User"));
var _TipoPagamento = _interopRequireDefault(require("../../../tipopagamento/typeorm/entities/TipoPagamento"));
var _MedicoExaminador = _interopRequireDefault(require("../../../medicoexaminador/typeorm/entities/MedicoExaminador"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
let Aso = (_dec = (0, _typeorm.Entity)('aso'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", typeof Number === "undefined" ? Object : Number), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec8 = (0, _typeorm.ManyToOne)(() => _Paciente.default), _dec9 = (0, _typeorm.JoinColumn)({
  name: 'paciente_id'
}), _dec0 = Reflect.metadata("design:type", typeof _Paciente.default === "undefined" ? Object : _Paciente.default), _dec1 = (0, _typeorm.Column)(), _dec10 = Reflect.metadata("design:type", String), _dec11 = (0, _typeorm.ManyToOne)(() => _Empresa.default), _dec12 = (0, _typeorm.JoinColumn)({
  name: 'empresa_id'
}), _dec13 = Reflect.metadata("design:type", typeof _Empresa.default === "undefined" ? Object : _Empresa.default), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.ManyToOne)(() => _Funcao.default), _dec17 = (0, _typeorm.JoinColumn)({
  name: 'funcao_id'
}), _dec18 = Reflect.metadata("design:type", typeof _Funcao.default === "undefined" ? Object : _Funcao.default), _dec19 = (0, _typeorm.Column)(), _dec20 = Reflect.metadata("design:type", String), _dec21 = (0, _typeorm.ManyToOne)(() => _TipoAso.default), _dec22 = (0, _typeorm.JoinColumn)({
  name: 'tipoaso_id'
}), _dec23 = Reflect.metadata("design:type", typeof _TipoAso.default === "undefined" ? Object : _TipoAso.default), _dec24 = (0, _typeorm.Column)(), _dec25 = Reflect.metadata("design:type", String), _dec26 = (0, _typeorm.ManyToOne)(() => _Medico.default), _dec27 = (0, _typeorm.JoinColumn)({
  name: 'medico_id'
}), _dec28 = Reflect.metadata("design:type", typeof _Medico.default === "undefined" ? Object : _Medico.default), _dec29 = (0, _typeorm.Column)(), _dec30 = Reflect.metadata("design:type", String), _dec31 = (0, _typeorm.ManyToOne)(() => _MedicoExaminador.default), _dec32 = (0, _typeorm.JoinColumn)({
  name: 'medicoexaminador_id'
}), _dec33 = Reflect.metadata("design:type", typeof _MedicoExaminador.default === "undefined" ? Object : _MedicoExaminador.default), _dec34 = (0, _typeorm.Column)(), _dec35 = Reflect.metadata("design:type", String), _dec36 = (0, _typeorm.ManyToOne)(() => _User.default), _dec37 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec38 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec39 = (0, _typeorm.Column)(), _dec40 = Reflect.metadata("design:type", String), _dec41 = (0, _typeorm.ManyToOne)(() => _TipoPagamento.default), _dec42 = (0, _typeorm.JoinColumn)({
  name: 'tipopagamento_id'
}), _dec43 = Reflect.metadata("design:type", typeof _TipoPagamento.default === "undefined" ? Object : _TipoPagamento.default), _dec44 = (0, _typeorm.Column)(), _dec45 = Reflect.metadata("design:type", String), _dec46 = (0, _typeorm.Column)(), _dec47 = Reflect.metadata("design:type", String), _dec48 = (0, _typeorm.Column)({
  nullable: true
}), _dec49 = Reflect.metadata("design:type", String), _dec50 = (0, _typeorm.Column)({
  nullable: true
}), _dec51 = Reflect.metadata("design:type", String), _dec52 = (0, _typeorm.Column)(), _dec53 = Reflect.metadata("design:type", Boolean), _dec54 = (0, _typeorm.Column)(), _dec55 = Reflect.metadata("design:type", Boolean), _dec56 = (0, _typeorm.CreateDateColumn)(), _dec57 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec58 = (0, _typeorm.UpdateDateColumn)(), _dec59 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec60 = (0, _typeorm.Column)({
  type: 'date',
  default: () => 'NOW()'
}), _dec61 = Reflect.metadata("design:type", String), _dec(_class = (_class2 = class Aso {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "codigoaso", _descriptor2, this);
    _initializerDefineProperty(this, "dataemissaoaso", _descriptor3, this);
    _initializerDefineProperty(this, "paciente", _descriptor4, this);
    _initializerDefineProperty(this, "paciente_id", _descriptor5, this);
    _initializerDefineProperty(this, "empresa", _descriptor6, this);
    _initializerDefineProperty(this, "empresa_id", _descriptor7, this);
    _initializerDefineProperty(this, "funcao", _descriptor8, this);
    _initializerDefineProperty(this, "funcao_id", _descriptor9, this);
    _initializerDefineProperty(this, "tipoaso", _descriptor0, this);
    _initializerDefineProperty(this, "tipoaso_id", _descriptor1, this);
    _initializerDefineProperty(this, "medico", _descriptor10, this);
    _initializerDefineProperty(this, "medico_id", _descriptor11, this);
    _initializerDefineProperty(this, "medicoexaminador", _descriptor12, this);
    _initializerDefineProperty(this, "medicoexaminador_id", _descriptor13, this);
    _initializerDefineProperty(this, "user", _descriptor14, this);
    _initializerDefineProperty(this, "user_id", _descriptor15, this);
    _initializerDefineProperty(this, "tipopagamento", _descriptor16, this);
    _initializerDefineProperty(this, "tipopagamento_id", _descriptor17, this);
    _initializerDefineProperty(this, "user_edit", _descriptor18, this);
    _initializerDefineProperty(this, "resultado", _descriptor19, this);
    _initializerDefineProperty(this, "motivo", _descriptor20, this);
    _initializerDefineProperty(this, "transmissaoesocial", _descriptor21, this);
    _initializerDefineProperty(this, "ativo", _descriptor22, this);
    _initializerDefineProperty(this, "created_at", _descriptor23, this);
    _initializerDefineProperty(this, "updated_at", _descriptor24, this);
    _initializerDefineProperty(this, "data_criacao", _descriptor25, this);
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "codigoaso", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "dataemissaoaso", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "paciente", [_dec8, _dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "paciente_id", [_dec1, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "empresa", [_dec11, _dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "empresa_id", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "funcao", [_dec16, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "funcao_id", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "tipoaso", [_dec21, _dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "tipoaso_id", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "medico", [_dec26, _dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "medico_id", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "medicoexaminador", [_dec31, _dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "medicoexaminador_id", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec36, _dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec39, _dec40], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "tipopagamento", [_dec41, _dec42, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "tipopagamento_id", [_dec44, _dec45], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "user_edit", [_dec46, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "resultado", [_dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "motivo", [_dec50, _dec51], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "transmissaoesocial", [_dec52, _dec53], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "ativo", [_dec54, _dec55], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec56, _dec57], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec58, _dec59], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "data_criacao", [_dec60, _dec61], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class);
var _default = exports.default = Aso;