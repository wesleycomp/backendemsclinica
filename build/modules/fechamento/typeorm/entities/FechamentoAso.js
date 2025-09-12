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
var Fechamento_1 = __importDefault(require("./Fechamento"));
var Aso_1 = __importDefault(require("@modules/aso/typeorm/entities/Aso"));
var FechamentoAso = /** @class */ (function () {
    function FechamentoAso() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], FechamentoAso.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], FechamentoAso.prototype, "fechamento_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Fechamento_1.default; }, function (f) { return f.asos; }),
        (0, typeorm_1.JoinColumn)({ name: 'fechamento_id' }),
        __metadata("design:type", Fechamento_1.default)
    ], FechamentoAso.prototype, "fechamento", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], FechamentoAso.prototype, "aso_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Aso_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'aso_id' }),
        __metadata("design:type", Aso_1.default)
    ], FechamentoAso.prototype, "aso", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], FechamentoAso.prototype, "valor", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], FechamentoAso.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], FechamentoAso.prototype, "updated_at", void 0);
    FechamentoAso = __decorate([
        (0, typeorm_1.Entity)('fechamento_asos')
    ], FechamentoAso);
    return FechamentoAso;
}());
exports.default = FechamentoAso;
