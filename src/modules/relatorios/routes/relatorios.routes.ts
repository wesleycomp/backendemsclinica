import { Router } from 'express'
import RelatoriosController from '../controllers/RelatoriosController'

const relatoriosRouter = Router()
const controller = new RelatoriosController()

// 🔹 Despesas
relatoriosRouter.get('/despesas', (req, res) => controller.despesas(req, res))
relatoriosRouter.get('/despesas/pdf', (req, res) => controller.despesasPdf(req, res))
relatoriosRouter.get('/despesas/excel', (req, res) => controller.despesasExcel(req, res))

// 🔹 Cobranças
relatoriosRouter.get('/cobrancas', (req, res) => controller.cobrancas(req, res))
relatoriosRouter.get('/cobrancas/pdf', (req, res) => controller.cobrancasPdf(req, res))
relatoriosRouter.get('/cobrancas/excel', (req, res) => controller.cobrancasExcel(req, res))


export default relatoriosRouter
