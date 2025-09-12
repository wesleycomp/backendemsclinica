"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvenioEmpresa1664132384879 = void 0;
var _typeorm = require("typeorm");
class ConvenioEmpresa1664132384879 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'convenioempresa',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'valorexame',
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0
      }, {
        name: 'valormedico',
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0
      }, {
        name: 'valorems',
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0
      }, {
        name: 'ativo',
        type: 'boolean'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('convenioempresa');
  }
}
exports.ConvenioEmpresa1664132384879 = ConvenioEmpresa1664132384879;