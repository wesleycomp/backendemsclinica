import { Router } from 'express'
import NacionalidadeController from '../controllers/NacionalidadeController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const NacionalidadeRouter = Router();
const NacionaliadeController = new NacionalidadeController();

NacionalidadeRouter.get('/', isAuthenticated, NacionaliadeController.index)

NacionalidadeRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    NacionaliadeController.show
                )


export default NacionalidadeRouter;
