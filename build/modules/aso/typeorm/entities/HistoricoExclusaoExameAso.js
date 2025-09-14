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
var HistoricoExclusaoExameAso = /** @class */ (function () {
    function HistoricoExclusaoExameAso() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "aso_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "exame_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "tipopagamento_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "paciente_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "empresa_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "funcao_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "usuario_id", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], HistoricoExclusaoExameAso.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'date',
            default: function () { return 'NOW()'; },
        }),
        __metadata("design:type", String)
    ], HistoricoExclusaoExameAso.prototype, "data_exclusao", void 0);
    HistoricoExclusaoExameAso = __decorate([
        (0, typeorm_1.Entity)('historico_exclusao_exameaso')
    ], HistoricoExclusaoExameAso);
    return HistoricoExclusaoExameAso;
}());
exports.default = HistoricoExclusaoExameAso;
