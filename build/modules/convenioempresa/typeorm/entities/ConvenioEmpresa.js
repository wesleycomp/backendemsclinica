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
var Empresa_1 = __importDefault(require("@modules/empresa/typeorm/entities/Empresa"));
var Exame_1 = __importDefault(require("@modules/exame/typeorm/entities/Exame"));
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("@modules/users/typeorm/entities/User"));
var ConvenioEmpresa = /** @class */ (function () {
    function ConvenioEmpresa() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], ConvenioEmpresa.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Empresa_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
        __metadata("design:type", Empresa_1.default)
    ], ConvenioEmpresa.prototype, "empresa", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ConvenioEmpresa.prototype, "empresa_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Exame_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'exame_id' }),
        __metadata("design:type", Exame_1.default)
    ], ConvenioEmpresa.prototype, "exame", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ConvenioEmpresa.prototype, "exame_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.default; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
        __metadata("design:type", Exame_1.default)
    ], ConvenioEmpresa.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ConvenioEmpresa.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], ConvenioEmpresa.prototype, "valorexame", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], ConvenioEmpresa.prototype, "valormedico", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], ConvenioEmpresa.prototype, "valorems", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ConvenioEmpresa.prototype, "ativo", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], ConvenioEmpresa.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], ConvenioEmpresa.prototype, "updated_at", void 0);
    ConvenioEmpresa = __decorate([
        (0, typeorm_1.Entity)('convenioempresa')
    ], ConvenioEmpresa);
    return ConvenioEmpresa;
}());
exports.default = ConvenioEmpresa;
