"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddAsoPaciente1670529982020 = void 0;
var _typeorm = require("typeorm");
class AddAsoPaciente1670529982020 {
  async up(queryRunner) {
    await queryRunner.addColumn('aso', new _typeorm.TableColumn({
      name: 'paciente_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('aso', new _typeorm.TableForeignKey({
      name: 'PacienteAsoPaciente',
      columnNames: ['paciente_id'],
      referencedTableName: 'paciente',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('aso', new _typeorm.TableColumn({
      name: 'empresa_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('aso', new _typeorm.TableForeignKey({
      name: 'EmpresaAsoPaciente',
      columnNames: ['empresa_id'],
      referencedTableName: 'empresa',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('aso', new _typeorm.TableColumn({
      name: 'tipoaso_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('aso', new _typeorm.TableForeignKey({
      name: 'TipoAsoPaciente',
      columnNames: ['tipoaso_id'],
      referencedTableName: 'tipoaso',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('aso', new _typeorm.TableColumn({
      name: 'medico_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('aso', new _typeorm.TableForeignKey({
      name: 'MedicoAsoPaciente',
      columnNames: ['medico_id'],
      referencedTableName: 'medico',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('aso', new _typeorm.TableColumn({
      name: 'tipopagamento_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('aso', new _typeorm.TableForeignKey({
      name: 'TipoPagamentoAso',
      columnNames: ['tipopagamento_id'],
      referencedTableName: 'tipopagamento',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('aso', new _typeorm.TableColumn({
      name: 'funcao_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('aso', new _typeorm.TableForeignKey({
      name: 'FuncaoPacienteAso',
      columnNames: ['funcao_id'],
      referencedTableName: 'funcao',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('aso', new _typeorm.TableColumn({
      name: 'user_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('aso', new _typeorm.TableForeignKey({
      name: 'UserPacienteAso',
      columnNames: ['user_id'],
      referencedTableName: 'user',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('aso', 'PacienteAsoPaciente');
    await queryRunner.dropForeignKey('aso', 'EmpresaAsoPaciente');
    await queryRunner.dropForeignKey('aso', 'TipoAsoPaciente');
    await queryRunner.dropForeignKey('aso', 'MedicoAsoPaciente');
    await queryRunner.dropForeignKey('aso', 'TipoPagamentoAso');
    await queryRunner.dropForeignKey('aso', 'FuncaoPacienteAso');
    await queryRunner.dropForeignKey('aso', 'UserPacienteAso');
    await queryRunner.dropColumn('aso', 'user_id');
    await queryRunner.dropColumn('aso', 'paciente_id');
    await queryRunner.dropColumn('aso', 'empresa_id');
    await queryRunner.dropColumn('aso', 'tipoaso_id');
    await queryRunner.dropColumn('aso', 'medico_id');
    await queryRunner.dropColumn('aso', 'tipopagamento_id');
    await queryRunner.dropColumn('aso', 'funcao_id');
  }
}
exports.AddAsoPaciente1670529982020 = AddAsoPaciente1670529982020;