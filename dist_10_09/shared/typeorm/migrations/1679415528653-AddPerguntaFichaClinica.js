"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddPerguntaFichaClinica1679415528653 = void 0;
var _typeorm = require("typeorm");
class AddPerguntaFichaClinica1679415528653 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'perguntafichaclinica',
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
        name: 'categoria',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'ativo',
        type: 'boolean',
        default: 'true'
      }, {
        name: 'ordem',
        type: 'integer'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('perguntafichaclinica');
  }
}
exports.AddPerguntaFichaClinica1679415528653 = AddPerguntaFichaClinica1679415528653;