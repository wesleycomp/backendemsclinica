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
var Aso_1 = __importDefault(require("@modules/aso/typeorm/entities/Aso"));
var typeorm_1 = require("typeorm");
var FichaClinica = /** @class */ (function () {
    function FichaClinica() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], FichaClinica.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Aso_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'aso_id' }),
        __metadata("design:type", Aso_1.default)
    ], FichaClinica.prototype, "aso", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], FichaClinica.prototype, "aso_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], FichaClinica.prototype, "categoria", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], FichaClinica.prototype, "pergunta", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], FichaClinica.prototype, "resposta", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], FichaClinica.prototype, "observacao", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], FichaClinica.prototype, "ordem", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], FichaClinica.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], FichaClinica.prototype, "updated_at", void 0);
    FichaClinica = __decorate([
        (0, typeorm_1.Entity)('fichaclinica')
    ], FichaClinica);
    return FichaClinica;
}());
exports.default = FichaClinica;
