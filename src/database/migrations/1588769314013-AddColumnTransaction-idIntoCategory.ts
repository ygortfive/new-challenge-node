import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnTransactionIdIntoCategory1588769314013
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'categories',
      new TableColumn({
        name: 'transactionId',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('categories', 'transactionId');
  }
}
