import { Router } from 'express'
import FinanceiroController from '../controllers/FinanceiroController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const financeiroRouter = Router();
const financeiroController = new FinanceiroController();

financeiroRouter.get('/', financeiroController.index)

financeiroRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    financeiroController.show
                )

export default financeiroRouter;
