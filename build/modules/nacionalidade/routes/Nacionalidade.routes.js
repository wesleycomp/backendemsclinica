"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var NacionalidadeController_1 = __importDefault(require("../controllers/NacionalidadeController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var NacionalidadeRouter = (0, express_1.Router)();
var NacionaliadeController = new NacionalidadeController_1.default();
NacionalidadeRouter.get('/', isAuthenticated_1.default, NacionaliadeController.index);
NacionalidadeRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), NacionaliadeController.show);
exports.default = NacionalidadeRouter;
