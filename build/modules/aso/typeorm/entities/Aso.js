"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Empresa_1 = __importDefault(require("@modules/empresa/typeorm/entities/Empresa"));
var Funcao_1 = __importDefault(require("@modules/funcao/typeorm/entities/Funcao"));
var Medico_1 = __importDefault(require("@modules/medico/typeorm/entities/Medico"));
var Paciente_1 = __importDefault(require("@modules/paciente/typeorm/entities/Paciente"));
var typeorm_1 = require("typeorm");
var TipoAso_1 = __importDefault(require("./TipoAso"));
var User_1 = __importDefault(require("@modules/users/typeorm/entities/User"));
var TipoPagamento_1 = __importDefault(require("@modules/tipopagamento/typeorm/entities/TipoPagamento"));
var MedicoExaminador_1 = __importDefault(require("@modules/medicoexaminador/typeorm/entities/MedicoExaminador"));
var Aso = /** @class */ (function () {
    function Aso() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Aso.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Aso.prototype, "codigoaso", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Aso.prototype, "dataemissaoaso", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Paciente_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'paciente_id' }),
        __metadata("design:type", Paciente_1.default)
    ], Aso.prototype, "paciente", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "paciente_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Empresa_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
        __metadata("design:type", Empresa_1.default)
    ], Aso.prototype, "empresa", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "empresa_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Funcao_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'funcao_id' }),
        __metadata("design:type", Funcao_1.default)
    ], Aso.prototype, "funcao", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "funcao_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return TipoAso_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'tipoaso_id' }),
        __metadata("design:type", TipoAso_1.default)
    ], Aso.prototype, "tipoaso", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "tipoaso_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Medico_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'medico_id' }),
        __metadata("design:type", Medico_1.default)
    ], Aso.prototype, "medico", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "medico_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return MedicoExaminador_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'medicoexaminador_id' }),
        __metadata("design:type", MedicoExaminador_1.default)
    ], Aso.prototype, "medicoexaminador", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "medicoexaminador_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
        __metadata("design:type", User_1.default)
    ], Aso.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return TipoPagamento_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'tipopagamento_id' }),
        __metadata("design:type", TipoPagamento_1.default)
    ], Aso.prototype, "tipopagamento", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "tipopagamento_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Aso.prototype, "user_edit", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Aso.prototype, "resultado", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Aso.prototype, "motivo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Aso.prototype, "transmissaoesocial", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Aso.prototype, "ativo", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Aso.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Aso.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'date',
            default: function () { return 'NOW()'; },
        }),
        __metadata("design:type", String)
    ], Aso.prototype, "data_criacao", void 0);
    Aso = __decorate([
        (0, typeorm_1.Entity)('aso')
    ], Aso);
    return Aso;
}());
exports.default = Aso;
