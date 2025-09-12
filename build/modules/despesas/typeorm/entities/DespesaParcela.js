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
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/despesaParcelas/typeorm/entities/DespesaParcela.ts
var typeorm_1 = require("typeorm");
var DespesaParcela = /** @class */ (function () {
    function DespesaParcela() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], DespesaParcela.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], DespesaParcela.prototype, "despesa_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], DespesaParcela.prototype, "numero", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", String)
    ], DespesaParcela.prototype, "vencimento", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
        __metadata("design:type", Number)
    ], DespesaParcela.prototype, "valor", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 'ABERTA' }),
        __metadata("design:type", String)
    ], DespesaParcela.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date', nullable: true, default: null }),
        __metadata("design:type", String)
    ], DespesaParcela.prototype, "data_pagamento", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, nullable: true, default: null }),
        __metadata("design:type", Number)
    ], DespesaParcela.prototype, "valor_pago", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true, default: null }),
        __metadata("design:type", String)
    ], DespesaParcela.prototype, "observacao", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], DespesaParcela.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], DespesaParcela.prototype, "updated_at", void 0);
    DespesaParcela = __decorate([
        (0, typeorm_1.Entity)('despesa_parcelas')
    ], DespesaParcela);
    return DespesaParcela;
}());
exports.default = DespesaParcela;
