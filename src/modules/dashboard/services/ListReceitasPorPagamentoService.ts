import { injectable } from "tsyringe";
import { getRepository } from "typeorm";

interface IRequest {
  ano: number;
  mes?: number;
  dia?: number;
}

interface IResponse {
  tipo_pagamento: string;
  total_receita: number;
}

@injectable()
export class ListReceitasPorPagamentoService {
  public async execute({ ano, mes, dia }: IRequest): Promise<IResponse[]> {
    const repo = getRepository("exameaso");

    const query = repo
      .createQueryBuilder("ea")
      .innerJoin("aso", "a", "a.id = ea.aso_id")
      .innerJoin("tipopagamento", "tp", "tp.id = ea.tipopagamento_id")
      .select("tp.descricao", "tipo_pagamento")
      .addSelect("SUM(ea.valorExame)", "total_receita")
      .where("ea.ativo = true")
      .andWhere("EXTRACT(YEAR FROM a.dataemissaoaso) = :ano", { ano });

    if (mes) {
      query.andWhere("EXTRACT(MONTH FROM a.dataemissaoaso) = :mes", { mes });
    }

    if (dia) {
      query.andWhere("EXTRACT(DAY FROM a.dataemissaoaso) = :dia", { dia });
    }

    const result = await query
      .groupBy("tp.descricao")
      .orderBy("total_receita", "DESC")
      .getRawMany();

    return result.map(r => ({
      tipo_pagamento: r.tipo_pagamento,
      total_receita: Number(r.total_receita),
    }));
  }
}

