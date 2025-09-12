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
var Medico_1 = __importDefault(require("@modules/medico/typeorm/entities/Medico"));
var Exame_1 = __importDefault(require("@modules/exame/typeorm/entities/Exame"));
var MedicoFechamento = /** @class */ (function () {
    function MedicoFechamento() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], MedicoFechamento.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Medico_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'medico_id' }),
        __metadata("design:type", Medico_1.default)
    ], MedicoFechamento.prototype, "medico", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], MedicoFechamento.prototype, "medico_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], MedicoFechamento.prototype, "valor", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Exame_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'exame_id' }),
        __metadata("design:type", Exame_1.default)
    ], MedicoFechamento.prototype, "exame", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], MedicoFechamento.prototype, "exame_id", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], MedicoFechamento.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], MedicoFechamento.prototype, "updated_at", void 0);
    MedicoFechamento = __decorate([
        (0, typeorm_1.Entity)('medicofechamento')
    ], MedicoFechamento);
    return MedicoFechamento;
}());
exports.default = MedicoFechamento;
