"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTipoPagamento1668009768538 = void 0;
var _typeorm = require("typeorm");
class CreateTipoPagamento1668009768538 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'tipopagamento',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'descricao',
        type: 'varchar'
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
    await queryRunner.dropTable('tipopagamento');
  }
}
exports.CreateTipoPagamento1668009768538 = CreateTipoPagamento1668009768538;