"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var express_1 = require("express");
var SessionsController_1 = __importDefault(require("../controllers/SessionsController"));
var sessionsRouter = (0, express_1.Router)();
var sessionsController = new SessionsController_1.default();
sessionsRouter.post('/', (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _a)), sessionsController.create);
exports.default = sessionsRouter;
