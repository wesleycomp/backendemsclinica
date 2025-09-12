"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaturezaJuridica1670529447402 = void 0;
var _typeorm = require("typeorm");
class NaturezaJuridica1670529447402 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'naturezajuridica',
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
    await queryRunner.dropTable('naturezajuridica');
  }
}
exports.NaturezaJuridica1670529447402 = NaturezaJuridica1670529447402;