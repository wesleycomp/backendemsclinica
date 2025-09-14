"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var DashboardRepository = /** @class */ (function () {
    function DashboardRepository() {
        this.exameAsoRepo = (0, typeorm_1.getRepository)('exameaso');
    }
    // helper para aplicar filtros de período em qualquer query/alias/coluna
    DashboardRepository.prototype.applyPeriodo = function (qb, alias, dateCol, p) {
        var col = "".concat(alias, ".").concat(dateCol);
        if (p.dataInicio && p.dataFim) {
            qb.andWhere("".concat(col, " BETWEEN :dataInicio AND :dataFim"), { dataInicio: p.dataInicio, dataFim: p.dataFim });
        }
        else {
            qb.andWhere("EXTRACT(YEAR FROM ".concat(col, ") = :ano"), { ano: p.ano });
            if (p.mes)
                qb.andWhere("EXTRACT(MONTH FROM ".concat(col, ") = :mes"), { mes: p.mes });
            if (p.dia)
                qb.andWhere("EXTRACT(DAY FROM ".concat(col, ") = :dia"), { dia: p.dia });
        }
    };
    // ───────────────────────────── Resumo (cards)
    DashboardRepository.prototype.resumoFinanceiro = function (ano, mes, dia, dataInicio, dataFim) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var p, receitaQB, receita, manager, despesaQB, despesa, totalReceita, totalDespesa;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        p = { ano: ano, mes: mes, dia: dia, dataInicio: dataInicio, dataFim: dataFim };
                        receitaQB = this.exameAsoRepo
                            .createQueryBuilder('ea')
                            .innerJoin('aso', 'a', 'a.id = ea.aso_id')
                            .select('COALESCE(SUM(ea.valorexame),0)', 'total_receita')
                            .where('ea.ativo = true')
                            .andWhere('a.ativo = true');
                        this.applyPeriodo(receitaQB, 'a', 'dataemissaoaso', p);
                        return [4 /*yield*/, receitaQB.getRawOne()];
                    case 1:
                        receita = _c.sent();
                        manager = this.exameAsoRepo.manager;
                        despesaQB = manager
                            .createQueryBuilder()
                            .select('COALESCE(SUM(d.valor_total),0)', 'total_despesa')
                            .from('despesas', 'd');
                        // Use "data_vencimento" (troque para "data_pagamento" se preferir pagar/baixado)
                        this.applyPeriodo(despesaQB, 'd', 'data_vencimento', p);
                        return [4 /*yield*/, despesaQB.getRawOne()];
                    case 2:
                        despesa = _c.sent();
                        totalReceita = Number((_a = receita === null || receita === void 0 ? void 0 : receita.total_receita) !== null && _a !== void 0 ? _a : 0);
                        totalDespesa = Number((_b = despesa === null || despesa === void 0 ? void 0 : despesa.total_despesa) !== null && _b !== void 0 ? _b : 0);
                        return [2 /*return*/, { receitas: totalReceita, despesas: totalDespesa, saldo: totalReceita - totalDespesa }];
                }
            });
        });
    };
    // ───────────────────────────── Barras: Receitas por Tipo de Pagamento
    // src/modules/dashboard/typeorm/repositories/DashboardRepository.ts
    DashboardRepository.prototype.receitasPorPagamento = function (ano, mes, dia, dataInicio, dataFim) {
        return __awaiter(this, void 0, void 0, function () {
            var qb, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qb = this.exameAsoRepo
                            .createQueryBuilder('ea')
                            .innerJoin('aso', 'a', 'a.id = ea.aso_id')
                            // ⬇️ se o tipo não estiver no exame, usa o do ASO
                            .leftJoin('tipopagamento', 'tp', 'tp.id = COALESCE(ea.tipopagamento_id, a.tipopagamento_id)')
                            .select("COALESCE(tp.descricao, 'Não informado')", 'tipo_pagamento')
                            .addSelect('COALESCE(SUM(ea.valorexame),0)', 'total_receita')
                            .where('ea.ativo = true')
                            .andWhere('a.ativo = true');
                        // filtros (ano/mês/dia ou intervalo) usando a.dataemissaoaso
                        if (dataInicio && dataFim) {
                            qb.andWhere('a.dataemissaoaso BETWEEN :dataInicio AND :dataFim', { dataInicio: dataInicio, dataFim: dataFim });
                        }
                        else {
                            qb.andWhere('EXTRACT(YEAR FROM a.dataemissaoaso) = :ano', { ano: ano });
                            if (mes)
                                qb.andWhere('EXTRACT(MONTH FROM a.dataemissaoaso) = :mes', { mes: mes });
                            if (dia)
                                qb.andWhere('EXTRACT(DAY FROM a.dataemissaoaso) = :dia', { dia: dia });
                        }
                        return [4 /*yield*/, qb
                                // se quiser agrupar já com o texto “Não informado”, use o mesmo COALESCE:
                                .groupBy("COALESCE(tp.descricao, 'Não informado')")
                                .orderBy('total_receita', 'DESC')
                                .getRawMany()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                labels: result.map(function (r) { return r.tipo_pagamento; }),
                                datasets: [{ label: 'Receitas por Tipo de Pagamento', data: result.map(function (r) { return Number(r.total_receita); }) }],
                            }];
                }
            });
        });
    };
    // ───────────────────────────── Linha: Receitas x Despesas (mensal/diário)
    DashboardRepository.prototype.receitasVsDespesas = function (ano, mes, dia, dataInicio, dataFim) {
        return __awaiter(this, void 0, void 0, function () {
            var p, manager, receitaQB, receitas, despesaQB, despesas, labels, dataReceitas, dataDespesas, dataSaldo, diasNoMes, _loop_1, d, mesesNomes, _loop_2, m;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = { ano: ano, mes: mes, dia: dia, dataInicio: dataInicio, dataFim: dataFim };
                        manager = this.exameAsoRepo.manager;
                        receitaQB = this.exameAsoRepo
                            .createQueryBuilder('ea')
                            .innerJoin('aso', 'a', 'a.id = ea.aso_id')
                            .where('ea.ativo = true')
                            .andWhere('a.ativo = true');
                        if (dataInicio && dataFim) {
                            receitaQB.andWhere('a.dataemissaoaso BETWEEN :dataInicio AND :dataFim', { dataInicio: dataInicio, dataFim: dataFim });
                        }
                        else {
                            receitaQB.andWhere('EXTRACT(YEAR FROM a.dataemissaoaso) = :ano', { ano: ano });
                            if (mes)
                                receitaQB.andWhere('EXTRACT(MONTH FROM a.dataemissaoaso) = :mes', { mes: mes });
                            if (dia)
                                receitaQB.andWhere('EXTRACT(DAY FROM a.dataemissaoaso) = :dia', { dia: dia });
                        }
                        if (mes) {
                            receitaQB
                                .select('EXTRACT(DAY FROM a.dataemissaoaso)', 'dia')
                                .addSelect('COALESCE(SUM(ea.valorexame),0)', 'total_receita')
                                .groupBy('dia')
                                .orderBy('dia', 'ASC');
                        }
                        else {
                            receitaQB
                                .select('EXTRACT(MONTH FROM a.dataemissaoaso)', 'mes')
                                .addSelect('COALESCE(SUM(ea.valorexame),0)', 'total_receita')
                                .groupBy('mes')
                                .orderBy('mes', 'ASC');
                        }
                        return [4 /*yield*/, receitaQB.getRawMany()
                            // ---------------- Despesas ----------------
                        ];
                    case 1:
                        receitas = _a.sent();
                        despesaQB = manager.createQueryBuilder().from('despesas', 'd');
                        if (dataInicio && dataFim) {
                            despesaQB.where('d.data_vencimento BETWEEN :dataInicio AND :dataFim', { dataInicio: dataInicio, dataFim: dataFim });
                        }
                        else {
                            despesaQB.where('EXTRACT(YEAR FROM d.data_vencimento) = :ano', { ano: ano });
                            if (mes)
                                despesaQB.andWhere('EXTRACT(MONTH FROM d.data_vencimento) = :mes', { mes: mes });
                            if (dia)
                                despesaQB.andWhere('EXTRACT(DAY FROM d.data_vencimento) = :dia', { dia: dia });
                        }
                        if (mes) {
                            despesaQB
                                .select('EXTRACT(DAY FROM d.data_vencimento)', 'dia')
                                .addSelect('COALESCE(SUM(d.valor_total),0)', 'total_despesa')
                                .groupBy('dia')
                                .orderBy('dia', 'ASC');
                        }
                        else {
                            despesaQB
                                .select('EXTRACT(MONTH FROM d.data_vencimento)', 'mes')
                                .addSelect('COALESCE(SUM(d.valor_total),0)', 'total_despesa')
                                .groupBy('mes')
                                .orderBy('mes', 'ASC');
                        }
                        return [4 /*yield*/, despesaQB.getRawMany()
                            // ---------------- Montagem ----------------
                        ];
                    case 2:
                        despesas = _a.sent();
                        labels = [];
                        dataReceitas = [];
                        dataDespesas = [];
                        dataSaldo = [];
                        if (mes) {
                            diasNoMes = new Date(ano, mes, 0).getDate() // nº de dias no mês
                            ;
                            _loop_1 = function (d) {
                                var receita = receitas.find(function (r) { return Number(r.dia) === d; });
                                var despesa = despesas.find(function (desp) { return Number(desp.dia) === d; });
                                var totalReceita = receita ? Number(receita.total_receita) : 0;
                                var totalDespesa = despesa ? Number(despesa.total_despesa) : 0;
                                labels.push(d.toString());
                                dataReceitas.push(totalReceita);
                                dataDespesas.push(totalDespesa);
                                dataSaldo.push(totalReceita - totalDespesa);
                            };
                            for (d = 1; d <= diasNoMes; d++) {
                                _loop_1(d);
                            }
                        }
                        else {
                            mesesNomes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                            _loop_2 = function (m) {
                                var receita = receitas.find(function (r) { return Number(r.mes) === m; });
                                var despesa = despesas.find(function (desp) { return Number(desp.mes) === m; });
                                var totalReceita = receita ? Number(receita.total_receita) : 0;
                                var totalDespesa = despesa ? Number(despesa.total_despesa) : 0;
                                labels.push(mesesNomes[m - 1]);
                                dataReceitas.push(totalReceita);
                                dataDespesas.push(totalDespesa);
                                dataSaldo.push(totalReceita - totalDespesa);
                            };
                            for (m = 1; m <= 12; m++) {
                                _loop_2(m);
                            }
                        }
                        return [2 /*return*/, {
                                labels: labels,
                                datasets: [
                                    { label: 'Receitas', data: dataReceitas, borderColor: 'green', backgroundColor: 'rgba(0,128,0,0.2)' },
                                    { label: 'Despesas', data: dataDespesas, borderColor: 'red', backgroundColor: 'rgba(255,0,0,0.2)' },
                                    { label: 'Saldo', data: dataSaldo, borderColor: 'blue', backgroundColor: 'rgba(0,0,255,0.2)' }
                                ]
                            }];
                }
            });
        });
    };
    DashboardRepository = __decorate([
        (0, typeorm_1.EntityRepository)()
    ], DashboardRepository);
    return DashboardRepository;
}());
exports.default = DashboardRepository;
