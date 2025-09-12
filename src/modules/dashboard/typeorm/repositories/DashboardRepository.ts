import { EntityRepository, getRepository, SelectQueryBuilder } from 'typeorm';

type Periodo = { ano?: number; mes?: number; dia?: number; dataInicio?: string; dataFim?: string; };

@EntityRepository()
export default class DashboardRepository {
  private exameAsoRepo = getRepository('exameaso');

  // helper para aplicar filtros de período em qualquer query/alias/coluna
  private applyPeriodo<T>(qb: SelectQueryBuilder<T>, alias: string, dateCol: string, p: Periodo) {
    const col = `${alias}.${dateCol}`;
    if (p.dataInicio && p.dataFim) {
      qb.andWhere(`${col} BETWEEN :dataInicio AND :dataFim`, { dataInicio: p.dataInicio, dataFim: p.dataFim });
    } else {
      qb.andWhere(`EXTRACT(YEAR FROM ${col}) = :ano`, { ano: p.ano });
      if (p.mes) qb.andWhere(`EXTRACT(MONTH FROM ${col}) = :mes`, { mes: p.mes });
      if (p.dia) qb.andWhere(`EXTRACT(DAY FROM ${col}) = :dia`, { dia: p.dia });
    }
  }

  // ───────────────────────────── Resumo (cards)
  public async resumoFinanceiro(ano?: number, mes?: number, dia?: number, dataInicio?: string, dataFim?: string) {
    const p: Periodo = { ano, mes, dia, dataInicio, dataFim };

    // Receitas (ASO + EXAMEASO)
    const receitaQB = this.exameAsoRepo
      .createQueryBuilder('ea')
      .innerJoin('aso', 'a', 'a.id = ea.aso_id')
      .select('COALESCE(SUM(ea.valorexame),0)', 'total_receita')
      .where('ea.ativo = true')
      .andWhere('a.ativo = true');

    this.applyPeriodo(receitaQB, 'a', 'dataemissaoaso', p);
    const receita = await receitaQB.getRawOne();

    // Despesas (tabela "despesas")
    const manager = this.exameAsoRepo.manager;
    const despesaQB = manager
      .createQueryBuilder()
      .select('COALESCE(SUM(d.valor_total),0)', 'total_despesa')
      .from('despesas', 'd');

    // Use "data_vencimento" (troque para "data_pagamento" se preferir pagar/baixado)
    this.applyPeriodo(despesaQB as any, 'd', 'data_vencimento', p);
    const despesa = await despesaQB.getRawOne();

    const totalReceita = Number(receita?.total_receita ?? 0);
    const totalDespesa = Number(despesa?.total_despesa ?? 0);

    return { receitas: totalReceita, despesas: totalDespesa, saldo: totalReceita - totalDespesa };
  }

  // ───────────────────────────── Barras: Receitas por Tipo de Pagamento
// src/modules/dashboard/typeorm/repositories/DashboardRepository.ts

public async receitasPorPagamento(ano?: number, mes?: number, dia?: number, dataInicio?: string, dataFim?: string) {
  const qb = this.exameAsoRepo
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
    qb.andWhere('a.dataemissaoaso BETWEEN :dataInicio AND :dataFim', { dataInicio, dataFim });
  } else {
    qb.andWhere('EXTRACT(YEAR FROM a.dataemissaoaso) = :ano', { ano });
    if (mes) qb.andWhere('EXTRACT(MONTH FROM a.dataemissaoaso) = :mes', { mes });
    if (dia) qb.andWhere('EXTRACT(DAY FROM a.dataemissaoaso) = :dia', { dia });
  }

  const result = await qb
    // se quiser agrupar já com o texto “Não informado”, use o mesmo COALESCE:
    .groupBy("COALESCE(tp.descricao, 'Não informado')")
    .orderBy('total_receita', 'DESC')
    .getRawMany();

  return {
    labels: result.map(r => r.tipo_pagamento),
    datasets: [{ label: 'Receitas por Tipo de Pagamento', data: result.map(r => Number(r.total_receita)) }],
  };
}


 
// ───────────────────────────── Linha: Receitas x Despesas (mensal/diário)
public async receitasVsDespesas(
  ano?: number,
  mes?: number,
  dia?: number,
  dataInicio?: string,
  dataFim?: string
) {
  const p: Periodo = { ano, mes, dia, dataInicio, dataFim }

  const manager = this.exameAsoRepo.manager

  // ---------------- Receitas ----------------
  const receitaQB = this.exameAsoRepo
    .createQueryBuilder('ea')
    .innerJoin('aso', 'a', 'a.id = ea.aso_id')
    .where('ea.ativo = true')
    .andWhere('a.ativo = true')

  if (dataInicio && dataFim) {
    receitaQB.andWhere('a.dataemissaoaso BETWEEN :dataInicio AND :dataFim', { dataInicio, dataFim })
  } else {
    receitaQB.andWhere('EXTRACT(YEAR FROM a.dataemissaoaso) = :ano', { ano })
    if (mes) receitaQB.andWhere('EXTRACT(MONTH FROM a.dataemissaoaso) = :mes', { mes })
    if (dia) receitaQB.andWhere('EXTRACT(DAY FROM a.dataemissaoaso) = :dia', { dia })
  }

  if (mes) {
    receitaQB
      .select('EXTRACT(DAY FROM a.dataemissaoaso)', 'dia')
      .addSelect('COALESCE(SUM(ea.valorexame),0)', 'total_receita')
      .groupBy('dia')
      .orderBy('dia', 'ASC')
  } else {
    receitaQB
      .select('EXTRACT(MONTH FROM a.dataemissaoaso)', 'mes')
      .addSelect('COALESCE(SUM(ea.valorexame),0)', 'total_receita')
      .groupBy('mes')
      .orderBy('mes', 'ASC')
  }

  const receitas = await receitaQB.getRawMany()

  // ---------------- Despesas ----------------
  const despesaQB = manager.createQueryBuilder().from('despesas', 'd')

  if (dataInicio && dataFim) {
    despesaQB.where('d.data_vencimento BETWEEN :dataInicio AND :dataFim', { dataInicio, dataFim })
  } else {
    despesaQB.where('EXTRACT(YEAR FROM d.data_vencimento) = :ano', { ano })
    if (mes) despesaQB.andWhere('EXTRACT(MONTH FROM d.data_vencimento) = :mes', { mes })
    if (dia) despesaQB.andWhere('EXTRACT(DAY FROM d.data_vencimento) = :dia', { dia })
  }

  if (mes) {
    despesaQB
      .select('EXTRACT(DAY FROM d.data_vencimento)', 'dia')
      .addSelect('COALESCE(SUM(d.valor_total),0)', 'total_despesa')
      .groupBy('dia')
      .orderBy('dia', 'ASC')
  } else {
    despesaQB
      .select('EXTRACT(MONTH FROM d.data_vencimento)', 'mes')
      .addSelect('COALESCE(SUM(d.valor_total),0)', 'total_despesa')
      .groupBy('mes')
      .orderBy('mes', 'ASC')
  }

  const despesas = await despesaQB.getRawMany()

  // ---------------- Montagem ----------------
  const labels: string[] = []
  const dataReceitas: number[] = []
  const dataDespesas: number[] = []
  const dataSaldo: number[] = []

  if (mes) {
    // mostra dias do mês
    const diasNoMes = new Date(ano!, mes, 0).getDate() // nº de dias no mês
    for (let d = 1; d <= diasNoMes; d++) {
      const receita = receitas.find(r => Number(r.dia) === d)
      const despesa = despesas.find(desp => Number(desp.dia) === d)

      const totalReceita = receita ? Number(receita.total_receita) : 0
      const totalDespesa = despesa ? Number(despesa.total_despesa) : 0

      labels.push(d.toString())
      dataReceitas.push(totalReceita)
      dataDespesas.push(totalDespesa)
      dataSaldo.push(totalReceita - totalDespesa)
    }
  } else {
    // mostra meses do ano
    const mesesNomes = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
    for (let m = 1; m <= 12; m++) {
      const receita = receitas.find(r => Number(r.mes) === m)
      const despesa = despesas.find(desp => Number(desp.mes) === m)

      const totalReceita = receita ? Number(receita.total_receita) : 0
      const totalDespesa = despesa ? Number(despesa.total_despesa) : 0

      labels.push(mesesNomes[m - 1])
      dataReceitas.push(totalReceita)
      dataDespesas.push(totalDespesa)
      dataSaldo.push(totalReceita - totalDespesa)
    }
  }

  return {
    labels,
    datasets: [
      { label: 'Receitas', data: dataReceitas, borderColor: 'green', backgroundColor: 'rgba(0,128,0,0.2)' },
      { label: 'Despesas', data: dataDespesas, borderColor: 'red',   backgroundColor: 'rgba(255,0,0,0.2)' },
      { label: 'Saldo',    data: dataSaldo,    borderColor: 'blue',  backgroundColor: 'rgba(0,0,255,0.2)' }
    ]
  }
}

}
