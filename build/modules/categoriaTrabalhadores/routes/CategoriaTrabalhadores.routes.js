"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CategoriaTrabalhadoresController_1 = __importDefault(require("../controllers/CategoriaTrabalhadoresController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var categoriatrabalhadoresRouter = (0, express_1.Router)();
var categoriatrabalhadoresController = new CategoriaTrabalhadoresController_1.default();
categoriatrabalhadoresRouter.get('/', isAuthenticated_1.default, categoriatrabalhadoresController.index);
categoriatrabalhadoresRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), categoriatrabalhadoresController.show);
exports.default = categoriatrabalhadoresRouter;
