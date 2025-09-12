"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAlteracoesUsuario1724698399751 = void 0;
var _typeorm = require("typeorm");
class CreateAlteracoesUsuario1724698399751 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'alteracoesusuarios',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'tipoalteracao',
        type: 'varchar'
      }, {
        name: 'usuarioaso',
        type: 'varchar'
      }, {
        name: 'usuarioedicao',
        type: 'varchar'
      }, {
        name: 'codigoaso',
        type: 'varchar'
      }, {
        name: 'antigaempresa',
        type: 'varchar'
      }, {
        name: 'novaempresa',
        type: 'varchar'
      }, {
        name: 'antigopaciente',
        type: 'varchar'
      }, {
        name: 'novopaciente',
        type: 'varchar'
      }, {
        name: 'dataso',
        type: 'date'
      }, {
        name: 'dataalteracao',
        type: 'date'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('alteracoesusuarios');
  }
}
exports.CreateAlteracoesUsuario1724698399751 = CreateAlteracoesUsuario1724698399751;