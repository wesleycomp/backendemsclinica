"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddFichaClinica1659415520525 = void 0;
var _typeorm = require("typeorm");
class AddFichaClinica1659415520525 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'fichaclinica',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'aso_id',
        type: 'varchar'
      }, {
        name: 'categoria',
        type: 'varchar'
      }, {
        name: 'pergunta',
        type: 'varchar'
      }, {
        name: 'resposta',
        type: 'varchar'
      }, {
        name: 'observacao',
        type: 'varchar'
      }, {
        name: 'ordem',
        type: 'integer'
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
    await queryRunner.dropTable('fichaclinica');
  }
}
exports.AddFichaClinica1659415520525 = AddFichaClinica1659415520525;