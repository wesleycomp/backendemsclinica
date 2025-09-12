"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEspecialidadeMedica1660588879708 = void 0;
var _typeorm = require("typeorm");
class CreateEspecialidadeMedica1660588879708 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'procedimentos',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'codigoesocial',
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
    await queryRunner.dropTable('especialidademedica');
  }
}
exports.CreateEspecialidadeMedica1660588879708 = CreateEspecialidadeMedica1660588879708;