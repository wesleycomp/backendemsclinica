import { Router } from 'express'
import TipoPagamentoController from '../controllers/TipoPagamentoController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const tipoPagamentoRouter = Router();
const tipoPagamentoController = new TipoPagamentoController();

tipoPagamentoRouter.get('/', isAuthenticated, tipoPagamentoController.index)

tipoPagamentoRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    tipoPagamentoController.show
                )


export default tipoPagamentoRouter;
