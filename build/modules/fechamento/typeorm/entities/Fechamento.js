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
var User_1 = __importDefault(require("@modules/users/typeorm/entities/User"));
var FechamentoAso_1 = __importDefault(require("./FechamentoAso"));
var Fechamento = /** @class */ (function () {
    function Fechamento() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Fechamento.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Fechamento.prototype, "empresa_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Empresa_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
        __metadata("design:type", Empresa_1.default)
    ], Fechamento.prototype, "empresa", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], Fechamento.prototype, "data_inicial", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], Fechamento.prototype, "data_final", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Fechamento.prototype, "criado_por", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'criado_por' }),
        __metadata("design:type", User_1.default)
    ], Fechamento.prototype, "usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Fechamento.prototype, "valor_total", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'aberto' }),
        __metadata("design:type", String)
    ], Fechamento.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Fechamento.prototype, "valor_pago", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date', nullable: true }),
        __metadata("design:type", Date)
    ], Fechamento.prototype, "data_fechamento", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
        __metadata("design:type", Date)
    ], Fechamento.prototype, "data_pagamento", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Fechamento.prototype, "observacao", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Fechamento.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Fechamento.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return FechamentoAso_1.default; }, function (fa) { return fa.fechamento; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Fechamento.prototype, "asos", void 0);
    Fechamento = __decorate([
        (0, typeorm_1.Entity)('fechamento')
    ], Fechamento);
    return Fechamento;
}());
exports.default = Fechamento;
