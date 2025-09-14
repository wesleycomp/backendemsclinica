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
var Procedimentos_1 = __importDefault(require("@modules/procedimentos/typeorm/entities/Procedimentos"));
var typeorm_1 = require("typeorm");
var Exame = /** @class */ (function () {
    function Exame() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Exame.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Procedimentos_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'procedimento_id' }),
        __metadata("design:type", Procedimentos_1.default)
    ], Exame.prototype, "procedimento", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Exame.prototype, "procedimento_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Exame.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Exame.prototype, "valoravista", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Exame.prototype, "valormedico", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], Exame.prototype, "valorems", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Exame.prototype, "ativo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Exame.prototype, "localrealizacaoexame", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Exame.prototype, "usuariocadastro", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Exame.prototype, "usuarioedicao", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Exame.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Exame.prototype, "updated_at", void 0);
    Exame = __decorate([
        (0, typeorm_1.Entity)('exame')
    ], Exame);
    return Exame;
}());
exports.default = Exame;
