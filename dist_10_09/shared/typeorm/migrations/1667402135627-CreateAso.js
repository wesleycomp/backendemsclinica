"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAso1667402135627 = void 0;
var _typeorm = require("typeorm");
class CreateAso1667402135627 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'aso',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'codigoaso',
        type: 'integer',
        isNullable: false
      }, {
        name: 'user_edit',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'dataemissaoaso',
        type: 'date'
      }, {
        name: 'resultado',
        type: 'boolean'
      }, {
        name: 'temexames',
        type: 'boolean'
      }, {
        name: 'transmissaoesocial',
        type: 'boolean'
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
    await queryRunner.dropTable('aso');
  }
}
exports.CreateAso1667402135627 = CreateAso1667402135627;