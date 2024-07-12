import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTableName1715938711485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `RENAME TABLE \`transaction_entity\` TO \`transactions\`;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `RENAME TABLE \`transactions\` TO \`transaction_entity\`;`,
    );
  }
}
