"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddEspecialidadeMedicaIdToExame1660671462161 = void 0;
var _typeorm = require("typeorm");
class AddEspecialidadeMedicaIdToExame1660671462161 {
  async up(queryRunner) {
    await queryRunner.addColumn('exame', new _typeorm.TableColumn({
      name: 'procedimento_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('exame', new _typeorm.TableForeignKey({
      name: 'ProcedimentosExames',
      columnNames: ['procedimento_id'],
      referencedTableName: 'procedimentos',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('exame', 'ProcedimentosExames');
    await queryRunner.dropColumn('exame', 'procedimento_id');
  }
}
exports.AddEspecialidadeMedicaIdToExame1660671462161 = AddEspecialidadeMedicaIdToExame1660671462161;