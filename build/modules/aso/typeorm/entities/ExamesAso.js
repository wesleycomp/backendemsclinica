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
var Exame_1 = __importDefault(require("@modules/exame/typeorm/entities/Exame"));
var TipoPagamento_1 = __importDefault(require("@modules/tipopagamento/typeorm/entities/TipoPagamento"));
var typeorm_1 = require("typeorm");
var Aso_1 = __importDefault(require("./Aso"));
var ExameAso = /** @class */ (function () {
    function ExameAso() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], ExameAso.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Aso_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'aso_id' }),
        __metadata("design:type", Aso_1.default)
    ], ExameAso.prototype, "aso", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ExameAso.prototype, "aso_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Exame_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'exame_id' }),
        __metadata("design:type", Exame_1.default)
    ], ExameAso.prototype, "exame", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ExameAso.prototype, "exame_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], ExameAso.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], ExameAso.prototype, "user_desconto", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return TipoPagamento_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'tipopagamento_id' }),
        __metadata("design:type", TipoPagamento_1.default)
    ], ExameAso.prototype, "tipopagamento", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ExameAso.prototype, "tipopagamento_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], ExameAso.prototype, "valorexamesemdesconto", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], ExameAso.prototype, "valorexame", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], ExameAso.prototype, "valormedico", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], ExameAso.prototype, "valorems", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", Boolean)
    ], ExameAso.prototype, "ativo", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", Boolean)
    ], ExameAso.prototype, "desconto", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], ExameAso.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], ExameAso.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'date',
            default: function () { return 'NOW()'; },
        }),
        __metadata("design:type", Date)
    ], ExameAso.prototype, "data_cadastro_exame", void 0);
    ExameAso = __decorate([
        (0, typeorm_1.Entity)('exameaso')
    ], ExameAso);
    return ExameAso;
}());
exports.default = ExameAso;
