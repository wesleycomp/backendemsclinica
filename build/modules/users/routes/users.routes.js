"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
var usersRouter = (0, express_1.Router)();
var usersController = new UsersController_1.default();
var usersAvatarController = new UserAvatarController_1.default();
var upload = (0, multer_1.default)(upload_1.default);
usersRouter.get('/', isAuthenticated_1.default, usersController.index);
usersRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), usersController.show);
usersRouter.post('/', (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
        perfil: celebrate_1.Joi.string().required(),
    },
    _b)), usersController.create);
usersRouter.put('/edit', (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().uuid().required(),
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
        perfil: celebrate_1.Joi.string().required(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required(),
    },
    _c)), usersController.update);
usersRouter.patch('/avatar', isAuthenticated_1.default, upload.single('avatar'), usersAvatarController.update);
exports.default = usersRouter;
