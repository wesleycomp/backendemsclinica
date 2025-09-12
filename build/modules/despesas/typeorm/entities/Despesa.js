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
var ContaBancaria_1 = __importDefault(require("@modules/contabancaria/typeorm/entities/ContaBancaria"));
var Despesa = /** @class */ (function () {
    function Despesa() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Despesa.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Despesa.prototype, "fornecedor_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
        __metadata("design:type", String)
    ], Despesa.prototype, "centro_custo_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
        __metadata("design:type", String)
    ], Despesa.prototype, "categoria_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 200 }),
        __metadata("design:type", String)
    ], Despesa.prototype, "descricao", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 60, nullable: true, default: null }),
        __metadata("design:type", String)
    ], Despesa.prototype, "documento", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", nullable: true, default: null }),
        __metadata("design:type", Date)
    ], Despesa.prototype, "data_emissao", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", nullable: true, default: null }),
        __metadata("design:type", Date)
    ], Despesa.prototype, "data_vencimento", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date", nullable: true }),
        __metadata("design:type", Date)
    ], Despesa.prototype, "data_pagamento", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 14, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Despesa.prototype, "valor_total", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 14, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Despesa.prototype, "valor_pago", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 14, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Despesa.prototype, "desconto", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 14, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Despesa.prototype, "valor_inicial", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 14, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Despesa.prototype, "juros", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
        __metadata("design:type", String)
    ], Despesa.prototype, "forma_pagamento_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 1 }),
        __metadata("design:type", Number)
    ], Despesa.prototype, "numero_parcelas", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 10, default: "ABERTA" }),
        __metadata("design:type", String)
    ], Despesa.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
        __metadata("design:type", String)
    ], Despesa.prototype, "conta_bancaria_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return ContaBancaria_1.default; }, function (conta) { return conta.despesas; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)({ name: "conta_bancaria_id" }),
        __metadata("design:type", ContaBancaria_1.default)
    ], Despesa.prototype, "conta_bancaria", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Despesa.prototype, "observacao", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Despesa.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Despesa.prototype, "updated_at", void 0);
    Despesa = __decorate([
        (0, typeorm_1.Entity)("despesas")
    ], Despesa);
    return Despesa;
}());
exports.default = Despesa;
