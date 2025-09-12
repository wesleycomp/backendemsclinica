"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CategoriaTrabalhador = _interopRequireDefault(require("../../../categoriaTrabalhadores/typeorm/entities/CategoriaTrabalhador"));
var _Empresa = _interopRequireDefault(require("../../../empresa/typeorm/entities/Empresa"));
var _Funcao = _interopRequireDefault(require("../../../funcao/typeorm/entities/Funcao"));
var _Nacionalidade = _interopRequireDefault(require("../../../nacionalidade/typeorm/entities/Nacionalidade"));
var _typeorm = require("typeorm");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
let Paciente = (_dec = (0, _typeorm.Entity)('paciente'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.ManyToOne)(() => _Empresa.default), _dec5 = (0, _typeorm.JoinColumn)({
  name: 'empresa_id'
}), _dec6 = Reflect.metadata("design:type", typeof _Empresa.default === "undefined" ? Object : _Empresa.default), _dec7 = (0, _typeorm.Column)(), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeorm.ManyToOne)(() => _Funcao.default), _dec0 = (0, _typeorm.JoinColumn)({
  name: 'funcao_id'
}), _dec1 = Reflect.metadata("design:type", typeof _Empresa.default === "undefined" ? Object : _Empresa.default), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.ManyToOne)(() => _CategoriaTrabalhador.default), _dec13 = (0, _typeorm.JoinColumn)({
  name: 'categoriatrabalhador_id'
}), _dec14 = Reflect.metadata("design:type", typeof _CategoriaTrabalhador.default === "undefined" ? Object : _CategoriaTrabalhador.default), _dec15 = (0, _typeorm.Column)(), _dec16 = Reflect.metadata("design:type", String), _dec17 = (0, _typeorm.ManyToOne)(() => _Nacionalidade.default), _dec18 = (0, _typeorm.JoinColumn)({
  name: 'nacionalidade_id'
}), _dec19 = Reflect.metadata("design:type", typeof _Nacionalidade.default === "undefined" ? Object : _Nacionalidade.default), _dec20 = (0, _typeorm.Column)(), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _typeorm.Column)(), _dec23 = Reflect.metadata("design:type", String), _dec24 = (0, _typeorm.Column)(), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec26 = (0, _typeorm.Column)(), _dec27 = Reflect.metadata("design:type", String), _dec28 = (0, _typeorm.Column)(), _dec29 = Reflect.metadata("design:type", String), _dec30 = (0, _typeorm.Column)(), _dec31 = Reflect.metadata("design:type", String), _dec32 = (0, _typeorm.Column)(), _dec33 = Reflect.metadata("design:type", String), _dec34 = (0, _typeorm.Column)(), _dec35 = Reflect.metadata("design:type", String), _dec36 = (0, _typeorm.Column)(), _dec37 = Reflect.metadata("design:type", String), _dec38 = (0, _typeorm.Column)(), _dec39 = Reflect.metadata("design:type", String), _dec40 = (0, _typeorm.Column)(), _dec41 = Reflect.metadata("design:type", String), _dec42 = (0, _typeorm.Column)(), _dec43 = Reflect.metadata("design:type", String), _dec44 = (0, _typeorm.Column)(), _dec45 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec46 = (0, _typeorm.Column)(), _dec47 = Reflect.metadata("design:type", String), _dec48 = (0, _typeorm.Column)(), _dec49 = Reflect.metadata("design:type", String), _dec50 = (0, _typeorm.CreateDateColumn)(), _dec51 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec52 = (0, _typeorm.UpdateDateColumn)(), _dec53 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class Paciente {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "empresa", _descriptor2, this);
    _initializerDefineProperty(this, "empresa_id", _descriptor3, this);
    _initializerDefineProperty(this, "funcao", _descriptor4, this);
    _initializerDefineProperty(this, "funcao_id", _descriptor5, this);
    _initializerDefineProperty(this, "categoriatrabalhador", _descriptor6, this);
    _initializerDefineProperty(this, "categoriatrabalhador_id", _descriptor7, this);
    _initializerDefineProperty(this, "nacionalidade", _descriptor8, this);
    _initializerDefineProperty(this, "nacionalidade_id", _descriptor9, this);
    _initializerDefineProperty(this, "matricula", _descriptor0, this);
    _initializerDefineProperty(this, "dataentradaempresa", _descriptor1, this);
    _initializerDefineProperty(this, "descricaoatividade", _descriptor10, this);
    _initializerDefineProperty(this, "nome", _descriptor11, this);
    _initializerDefineProperty(this, "cpf", _descriptor12, this);
    _initializerDefineProperty(this, "rg", _descriptor13, this);
    _initializerDefineProperty(this, "telefone", _descriptor14, this);
    _initializerDefineProperty(this, "genero", _descriptor15, this);
    _initializerDefineProperty(this, "tiposanguineo", _descriptor16, this);
    _initializerDefineProperty(this, "nis", _descriptor17, this);
    _initializerDefineProperty(this, "ctps", _descriptor18, this);
    _initializerDefineProperty(this, "datanascimento", _descriptor19, this);
    _initializerDefineProperty(this, "endereco", _descriptor20, this);
    _initializerDefineProperty(this, "email", _descriptor21, this);
    _initializerDefineProperty(this, "created_at", _descriptor22, this);
    _initializerDefineProperty(this, "updated_at", _descriptor23, this);
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "funcao", [_dec9, _dec0, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "funcao_id", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "categoriatrabalhador", [_dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "categoriatrabalhador_id", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "nacionalidade", [_dec17, _dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "nacionalidade_id", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "matricula", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "dataentradaempresa", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "descricaoatividade", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "nome", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "cpf", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "rg", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "telefone", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "genero", [_dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "tiposanguineo", [_dec38, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "nis", [_dec40, _dec41], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "ctps", [_dec42, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "datanascimento", [_dec44, _dec45], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "endereco", [_dec46, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec50, _dec51], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec52, _dec53], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class);
var _default = exports.default = Paciente;