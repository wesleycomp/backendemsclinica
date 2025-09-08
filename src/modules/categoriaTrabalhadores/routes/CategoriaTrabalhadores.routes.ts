import { Router } from 'express'
import categoriatrabalhador from '../controllers/CategoriaTrabalhadoresController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const categoriatrabalhadoresRouter = Router();
const categoriatrabalhadoresController = new categoriatrabalhador();

categoriatrabalhadoresRouter.get('/', isAuthenticated, categoriatrabalhadoresController.index)

categoriatrabalhadoresRouter.get(
                    '/:id',
                    isAuthenticated,
                    celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                    categoriatrabalhadoresController.show
                )


export default categoriatrabalhadoresRouter;
