import { celebrate, Joi, Segments } from 'celebrate';
import { Router} from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.get('/:id',
                     isAuthenticated,
                     celebrate({
                        [Segments.PARAMS]:{
                            id: Joi.string().uuid().required(),
                        },
                    }),
                     usersController.show
                     );

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]:{
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            perfil: Joi.string().required(),
        },
    }),
    usersController.create,
);
    usersRouter.put(
        '/edit',
        celebrate({
            [Segments.BODY]:{
             id: Joi.string().uuid().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            perfil: Joi.string().required(),
            created_at: Joi.string().required(),
            updated_at: Joi.string().required(),

        }
    }),
    usersController.update,
);



    usersRouter.patch(
        '/avatar',
        isAuthenticated,
        upload.single('avatar'),
        usersAvatarController.update,
    )

export default usersRouter;
