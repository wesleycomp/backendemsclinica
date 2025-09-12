import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Despesa from '@modules/despesas/typeorm/entities/Despesa'
import Fechamento from '@modules/fechamento/typeorm/entities/Fechamento'
import PDFDocument from 'pdfkit'
import ExcelJS from 'exceljs'

export default class RelatoriosController {
  public async despesas(req: Request, res: Response): Promise<Response> {
    const { dataInicio, dataFim, status } = req.query
    const repo = getRepository(Despesa)

    const qb = repo.createQueryBuilder('d')

    if (dataInicio && dataFim) {
      qb.andWhere('d.data_vencimento BETWEEN :inicio AND :fim', {
        inicio: dataInicio,
        fim: dataFim,
      })
    }
    if (status && status !== 'null') {
      qb.andWhere('d.status = :status', { status })
    }

    const despesas = await qb.getMany()
    return res.json(despesas)
  }

public async despesasExcel(req: Request, res: Response): Promise<void> {
  try {
    const { dataInicio, dataFim, status } = req.query
    const repo = getRepository(Despesa)
    const qb = repo.createQueryBuilder('d')

    if (dataInicio && dataFim) {
      qb.andWhere('d.data_vencimento BETWEEN :inicio AND :fim', {
        inicio: dataInicio,
        fim: dataFim,
      })
    }
    if (status && status !== 'null') {
      qb.andWhere('d.status = :status', { status })
    }

    const despesas = await qb.getMany()
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Despesas')

    sheet.columns = [
      { header: 'Descrição', key: 'descricao', width: 40 },
      { header: 'Valor (R$)', key: 'valor_total', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Data Vencimento', key: 'data_vencimento', width: 20 },
    ]

    despesas.forEach(d => {
  const valor = Number(d.valor_total || 0)

  sheet.addRow({
    descricao: d.descricao,
    valor_total: valor, // deixa número mesmo, Excel formata
    status: d.status,
    data_vencimento: d.data_vencimento
      ? new Date(d.data_vencimento).toLocaleDateString('pt-BR')
      : '-',
  })
})


    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=relatorio_despesas.xlsx'
    )

    await workbook.xlsx.write(res)
    res.end()
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao gerar Excel', error })
  }
}










public async despesasPdf(req: Request, res: Response): Promise<void> {
  const { dataInicio, dataFim, status } = req.query
  const repo = getRepository(Despesa)
  const qb = repo.createQueryBuilder('d')

  if (dataInicio && dataFim) {
    qb.andWhere('d.data_vencimento BETWEEN :inicio AND :fim', {
      inicio: dataInicio,
      fim: dataFim,
    })
  }
  if (status && status !== 'null') {
    qb.andWhere('d.status = :status', { status })
  }

  const despesas = await qb.getMany()
  const doc = new PDFDocument({ margin: 40 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'inline; filename=relatorio_despesas.pdf')

  doc.pipe(res)

  // 🔹 Título
  doc.fontSize(16).text('Relatório de Despesas', { align: 'center' })
  doc.moveDown(2)

  // 🔹 Cabeçalho (com posições fixas)
  let y = doc.y
  doc.fontSize(12).fillColor('black').font('Helvetica-Bold')
  doc.text('Descrição', 40, y, { width: 200 })
  doc.text('Status', 250, y, { width: 80 })
  doc.text('Valor (R$)', 340, y, { width: 100, align: 'right' })
  doc.text('Vencimento', 460, y, { width: 100 })
  doc.moveDown(0.5)

  // 🔹 Linha separadora
  y = doc.y
  doc.moveTo(40, y).lineTo(560, y).stroke()
  doc.moveDown(0.5)

  // 🔹 Linhas + soma total
  let total = 0
  despesas.forEach(d => {
    const venc = d.data_vencimento
      ? new Date(d.data_vencimento).toLocaleDateString('pt-BR')
      : '-'
    const valor = Number(d.valor_total || 0)
    total += valor

    y = doc.y

    // Descrição
    doc.font('Helvetica').fontSize(10).fillColor('black')
    doc.text(d.descricao || '', 40, y, { width: 200 })

    // Status colorido
    if (d.status === 'PAGA') doc.fillColor('green')
    else if (d.status === 'ABERTA') doc.fillColor('red')
    else doc.fillColor('gray')
    doc.text(d.status || '', 250, y, { width: 80 })

    // Valor
    doc.fillColor('black')
    doc.text(`R$ ${valor.toFixed(2)}`, 340, y, { width: 100, align: 'right' })

    // Vencimento
    doc.text(venc, 460, y, { width: 100 })
  })

  // 🔹 Linha separadora final
  doc.moveDown(0.5)
  y = doc.y
  doc.moveTo(40, y).lineTo(560, y).stroke()

  // 🔹 Total final
  doc.fontSize(12).fillColor('black').font('Helvetica-Bold')
  doc.text('TOTAL', 40, doc.y + 5, { width: 300 })
  doc.text(`R$ ${total.toFixed(2)}`, 340, doc.y + 5, { width: 220, align: 'right' })

  doc.end()
}

public async cobrancas(req: Request, res: Response): Promise<Response> {
  const { dataInicio, dataFim, status } = req.query
  const repo = getRepository(Fechamento) // 👈 entidade de cobrança/fechamento
  const qb = repo.createQueryBuilder('f')
    .leftJoinAndSelect('f.empresa', 'e')

  if (dataInicio && dataFim) {
    qb.andWhere('f.data_fechamento BETWEEN :inicio AND :fim', { inicio: dataInicio, fim: dataFim })
  }
  if (status && status !== 'null') {
    qb.andWhere('f.status = :status', { status })
  }

  const cobrancas = await qb.getMany()
  return res.json(cobrancas)
}



public async cobrancasPdf(req: Request, res: Response): Promise<void> {
  const repo = getRepository(Fechamento)
  const qb = repo.createQueryBuilder('f')
    .leftJoinAndSelect('f.empresa', 'e')

  const fechamentos = await qb.getMany()

  // 🔹 Documento em PAISAGEM
  const doc = new PDFDocument({ margin: 40, size: 'A4', layout: 'landscape' })
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'inline; filename=relatorio_cobrancas.pdf')
  doc.pipe(res)

  // 🔹 Título
  doc.fontSize(18).text('Relatório de Cobranças', { align: 'center' })
  doc.moveDown(2)

  // 🔹 Cabeçalho
  let y = doc.y
  doc.fontSize(12).fillColor('black').font('Helvetica-Bold')
  doc.text('Empresa', 40, y, { width: 220 })
  doc.text('CNPJ', 270, y, { width: 120 })
  doc.text('Valor (R$)', 400, y, { width: 80, align: 'right' })
  doc.text('Pago (R$)', 490, y, { width: 80, align: 'right' })
  doc.text('Status', 590, y, { width: 80 })
  doc.text('Competência', 680, y, { width: 100 })

  // 🔹 Linha separadora
  y = doc.y + 5
  doc.moveTo(40, y).lineTo(760, y).stroke()
  doc.moveDown(0.5)

  // 🔹 Linhas + soma total
  let total = 0
fechamentos.forEach(f => {
  const competencia = f.data_inicial
    ? `${String(new Date(f.data_inicial).getMonth() + 1).padStart(2, '0')}/${new Date(f.data_inicial).getFullYear()}`
    : ''

  const valor = Number(f.valor_total || 0)
  const pago = Number(f.valor_pago || 0)
  total += valor

  const empresaNome = f.empresa?.nome
    ? f.empresa.nome.length > 40
      ? f.empresa.nome.substring(0, 37) + '...'
      : f.empresa.nome
    : ''

  y = doc.y
  doc.font('Helvetica').fontSize(10).fillColor('black')
  doc.text(empresaNome, 40, y, { width: 220 })    
  doc.text(f.empresa?.cnpj || '', 270, y, { width: 120 })
  doc.text(`R$ ${valor.toFixed(2)}`, 400, y, { width: 80, align: 'right' })
  doc.text(`R$ ${pago.toFixed(2)}`, 490, y, { width: 80, align: 'right' })

  if ((f.status || '').toUpperCase() === 'PAGO') doc.fillColor('green')
  else if ((f.status || '').toUpperCase() === 'ABERTO') doc.fillColor('red')
  else doc.fillColor('gray')
  doc.text(f.status || '', 590, y, { width: 80 })

  doc.fillColor('black')
  doc.text(competencia, 680, y, { width: 100 })
})


  // 🔹 Linha final
  doc.moveDown(0.5)
  y = doc.y
  doc.moveTo(40, y).lineTo(760, y).stroke()

  // 🔹 Total
  doc.fontSize(12).fillColor('black').font('Helvetica-Bold')
  doc.text('TOTAL', 40, doc.y + 5, { width: 340 })
  doc.text(`R$ ${total.toFixed(2)}`, 400, doc.y + 5, { width: 380, align: 'right' })

  doc.end()
}










  public async cobrancasExcel(req: Request, res: Response): Promise<void> {
    const repo = getRepository(Fechamento)
    const qb = repo.createQueryBuilder('f')
      .leftJoinAndSelect('f.empresa', 'e')
    const fechamentos = await qb.getMany()

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Cobranças')

    sheet.columns = [
      { header: 'Empresa', key: 'empresa', width: 40 },
      { header: 'CNPJ', key: 'cnpj', width: 20 },
      { header: 'Valor (R$)', key: 'valor_total', width: 15 },
      { header: 'Valor Pago (R$)', key: 'valor_pago', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Competência', key: 'competencia', width: 15 }
    ]

    fechamentos.forEach(f => {
            let competencia = ''
                if (f.data_inicial) {
                const dataIni = new Date(f.data_inicial)
                competencia = `${String(dataIni.getMonth() + 1).padStart(2, '0')}/${dataIni.getFullYear()}`
                }

                sheet.addRow({
                empresa: f.empresa?.nome,
                cnpj: f.empresa?.cnpj,
                valor_total: f.valor_total,
                valor_pago: f.valor_pago,
                status: f.status,
                competencia
                })

    })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio_cobrancas.xlsx')
    await workbook.xlsx.write(res)
    res.end()
  }






}
