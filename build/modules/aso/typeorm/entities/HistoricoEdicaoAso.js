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
var typeorm_1 = require("typeorm");
var HistoricoEdicaoAso = /** @class */ (function () {
    function HistoricoEdicaoAso() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "aso_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "descricao_alteracao", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idtipopagamento_antigo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idtipopagamento_novo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idempresa_antiga", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idempresa_novo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idmedico_antigo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idmedico_novo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idfuncao_antigo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idfuncao_novo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idusuario", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idtipoaso_antigo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "idtipoaso_novo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "motivo", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], HistoricoEdicaoAso.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'date',
            default: function () { return 'NOW()'; },
        }),
        __metadata("design:type", String)
    ], HistoricoEdicaoAso.prototype, "data_alteracao", void 0);
    HistoricoEdicaoAso = __decorate([
        (0, typeorm_1.Entity)('historico_edicao_aso')
    ], HistoricoEdicaoAso);
    return HistoricoEdicaoAso;
}());
exports.default = HistoricoEdicaoAso;
