"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddExameAso1667523491570 = void 0;
var _typeorm = require("typeorm");
class AddExameAso1667523491570 {
  async up(queryRunner) {
    await queryRunner.addColumn('exameaso', new _typeorm.TableColumn({
      name: 'aso_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.addColumn('exameaso', new _typeorm.TableColumn({
      name: 'exame_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('exameaso', new _typeorm.TableForeignKey({
      name: 'AsoPacienteExame',
      columnNames: ['aso_id'],
      referencedTableName: 'aso',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.createForeignKey('exameaso', new _typeorm.TableForeignKey({
      name: 'ExameAsoPaciente',
      columnNames: ['exame_id'],
      referencedTableName: 'exame',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('exameaso', 'AsoPacienteExame');
    await queryRunner.dropForeignKey('exameaso', 'ExameAsoPaciente');
    await queryRunner.dropColumn('exameaso', 'aso_id');
    await queryRunner.dropColumn('exameaso', 'exame_id');
  }
}
exports.AddExameAso1667523491570 = AddExameAso1667523491570;