"use strict";

require("reflect-metadata");
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _cors = _interopRequireDefault(require("cors"));
var _celebrate = require("celebrate");
var _typeormPagination = require("typeorm-pagination");
var _routes = _interopRequireDefault(require("./routes"));
var _AppError = _interopRequireDefault(require("../errors/AppError"));
require("../typeorm");
var _upload = _interopRequireDefault(require("../../config/upload"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const port = process.env.APP_API_PORT || 3333;
const app = (0, _express.default)();
app.use(_typeormPagination.pagination);
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.directory));
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((error, request, response, next) => {
  //middleware trata as requisicoes em todas as API'S - sem precisar usar try cath no sistema

  if (error instanceof _AppError.default) {
    // entra caso seja erro de requisicao for uma instancia da classe da API
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }
  return response.status(500).json({
    // entra caso seja erro do servidor
    status: 'error',
    message: 'Internal server error'
  });
});
const server = app.listen(port, () => {
  console.log('Servidor esta startado na port 3333');
});