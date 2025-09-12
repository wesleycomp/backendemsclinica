"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
var typeorm_pagination_1 = require("typeorm-pagination");
var routes_1 = __importDefault(require("./routes"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
require("@shared/typeorm");
var upload_1 = __importDefault(require("@config/upload"));
var port = process.env.APP_API_PORT || 3333;
var app = (0, express_1.default)();
app.use(typeorm_pagination_1.pagination);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(routes_1.default);
app.use((0, celebrate_1.errors)());
app.use(function (error, request, response, next) {
    if (error instanceof AppError_1.default) { // entra caso seja erro de requisicao for uma instancia da classe da API
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    console.error('🔥 Erro não tratado:', error);
    return response.status(500).json({
        status: 'error',
        message: error.message || 'Internal server error',
    });
});
var server = app.listen(port, function () {
    console.log('Servidor esta startado na port 3333');
});
