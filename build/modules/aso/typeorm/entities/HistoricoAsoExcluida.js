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
var typeorm_1 = require("typeorm");
var Empresa_1 = __importDefault(require("@modules/empresa/typeorm/entities/Empresa"));
var Paciente_1 = __importDefault(require("@modules/paciente/typeorm/entities/Paciente"));
var User_1 = __importDefault(require("@modules/users/typeorm/entities/User"));
var TipoPagamento_1 = __importDefault(require("@modules/tipopagamento/typeorm/entities/TipoPagamento"));
var HistoricoAsoExcluida = /** @class */ (function () {
    function HistoricoAsoExcluida() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "aso_id", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], HistoricoAsoExcluida.prototype, "dataemissaoaso", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Paciente_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'paciente_id' }),
        __metadata("design:type", Paciente_1.default)
    ], HistoricoAsoExcluida.prototype, "paciente", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "paciente_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Empresa_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
        __metadata("design:type", Empresa_1.default)
    ], HistoricoAsoExcluida.prototype, "empresa", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "empresa_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "funcao_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "tipoaso_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "medico_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "medicoexaminador_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "resultado", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], HistoricoAsoExcluida.prototype, "transmissaoesocial", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], HistoricoAsoExcluida.prototype, "ativo", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], HistoricoAsoExcluida.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], HistoricoAsoExcluida.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
        __metadata("design:type", User_1.default)
    ], HistoricoAsoExcluida.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "user_edit", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], HistoricoAsoExcluida.prototype, "codigoaso", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return TipoPagamento_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'tipopagamento_id' }),
        __metadata("design:type", TipoPagamento_1.default)
    ], HistoricoAsoExcluida.prototype, "tipopagamento", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "tipopagamento_id", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], HistoricoAsoExcluida.prototype, "data_criacao", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "user_exclusao", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'date',
            default: function () { return 'NOW()'; },
        }),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "data_exclusao", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoAsoExcluida.prototype, "motivo", void 0);
    HistoricoAsoExcluida = __decorate([
        (0, typeorm_1.Entity)('historico_aso_excluida')
    ], HistoricoAsoExcluida);
    return HistoricoAsoExcluida;
}());
exports.default = HistoricoAsoExcluida;
