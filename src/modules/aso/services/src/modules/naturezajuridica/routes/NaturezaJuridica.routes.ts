import { Router } from 'express'
import NaturezaJuridicaController from '../controllers/NaturezaJuridicaController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const naturezaJuridicaRouter = Router();
const naturezaJuridicaController = new NaturezaJuridicaController();

naturezaJuridicaRouter.get('/', isAuthenticated, naturezaJuridicaController.index)

naturezaJuridicaRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    naturezaJuridicaController.show
                )


export default naturezaJuridicaRouter;
