import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUsersDatabase1713768656950 implements MigrationInterface {
  name = 'InitUsersDatabase1713768656950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`emailConfirmedAt\` timestamp NULL, \`confirmationToken\` varchar(255) NOT NULL DEFAULT '', \`confirmationSentAt\` timestamp NULL, \`confirmedAt\` timestamp NULL, \`recoveryToken\` varchar(255) NULL, \`recoverySentAt\` timestamp NULL, \`lastSignInAt\` timestamp NULL, \`rawUserMetadata\` text NOT NULL DEFAULT '{}', \`phone\` varchar(255) NULL, \`phoneConfirmedAt\` timestamp NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
