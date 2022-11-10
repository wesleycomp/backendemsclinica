import { Router } from 'express'
import TipoAsoController from '../controllers/TipoAsoController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const tipoAsoRouter = Router();
const tipoAsoController = new TipoAsoController();

tipoAsoRouter.get('/', isAuthenticated, tipoAsoController.index)

tipoAsoRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    tipoAsoController.show
                )


export default tipoAsoRouter;
