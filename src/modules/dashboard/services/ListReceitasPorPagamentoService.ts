// src/modules/dashboard/services/ListReceitasPorPagamentoService.ts
import { getManager } from "typeorm";

type Filtro = { dataInicio?: string; dataFim?: string; empresaId?: string };
type Resultado = { forma_pagamento: string; total: number; quantidade: number };

export default class ListReceitasPorPagamentoService {
  public async execute({ dataInicio, dataFim, empresaId }: Filtro): Promise<Resultado[]> {
    const manager = getManager();
    const params: any[] = [];
    let where = '1=1';

    if (dataInicio) { params.push(dataInicio); where += ` AND r.data >= $${params.length}`; }
    if (dataFim)    { params.push(dataFim);    where += ` AND r.data <= $${params.length}`; }
    if (empresaId)  { params.push(empresaId);  where += ` AND r.empresa_id = $${params.length}`; }

    const sql = `
      SELECT fp.nome AS forma_pagamento,
             COALESCE(SUM(r.valor),0) AS total,
             COUNT(*) AS quantidade
        FROM receita r
        JOIN forma_pagamento fp ON fp.id = r.forma_pagamento_id
       WHERE ${where}
       GROUP BY fp.nome
       ORDER BY fp.nome
    `;
    const rows = await manager.query(sql, params);
    return rows.map((r: any) => ({
      forma_pagamento: r.forma_pagamento,
      total: Number(r.total),
      quantidade: Number(r.quantidade),
    }));
  }
}
