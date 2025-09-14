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
var CategoriaTrabalhador_1 = __importDefault(require("@modules/categoriaTrabalhadores/typeorm/entities/CategoriaTrabalhador"));
var Empresa_1 = __importDefault(require("@modules/empresa/typeorm/entities/Empresa"));
var Funcao_1 = __importDefault(require("@modules/funcao/typeorm/entities/Funcao"));
var Nacionalidade_1 = __importDefault(require("@modules/nacionalidade/typeorm/entities/Nacionalidade"));
var typeorm_1 = require("typeorm");
var Paciente = /** @class */ (function () {
    function Paciente() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Paciente.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Empresa_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
        __metadata("design:type", Empresa_1.default)
    ], Paciente.prototype, "empresa", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "empresa_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Funcao_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'funcao_id' }),
        __metadata("design:type", Empresa_1.default)
    ], Paciente.prototype, "funcao", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "funcao_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return CategoriaTrabalhador_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'categoriatrabalhador_id' }),
        __metadata("design:type", CategoriaTrabalhador_1.default)
    ], Paciente.prototype, "categoriatrabalhador", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "categoriatrabalhador_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Nacionalidade_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'nacionalidade_id' }),
        __metadata("design:type", Nacionalidade_1.default)
    ], Paciente.prototype, "nacionalidade", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "nacionalidade_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "matricula", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Paciente.prototype, "dataentradaempresa", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "descricaoatividade", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "nome", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "cpf", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "rg", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "telefone", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "genero", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "tiposanguineo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "nis", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "ctps", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Paciente.prototype, "datanascimento", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "endereco", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Paciente.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Paciente.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Paciente.prototype, "updated_at", void 0);
    Paciente = __decorate([
        (0, typeorm_1.Entity)('paciente')
    ], Paciente);
    return Paciente;
}());
exports.default = Paciente;
