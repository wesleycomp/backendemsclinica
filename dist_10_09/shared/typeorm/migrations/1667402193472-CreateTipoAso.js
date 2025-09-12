"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTipoAso1667402193472 = void 0;
var _typeorm = require("typeorm");
class CreateTipoAso1667402193472 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'tipoaso',
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
    await queryRunner.dropTable('tipoaso');
  }
}
exports.CreateTipoAso1667402193472 = CreateTipoAso1667402193472;