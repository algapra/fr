import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCompanyTable1715590753339 implements MigrationInterface {
  name = 'InitCompanyTable1715590753339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`companies\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`address\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`type\` varchar(255) NOT NULL, \`field\` varchar(255) NOT NULL, \`memberCount\` int NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`emailConfirmedAt\` \`emailConfirmedAt\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`confirmationSentAt\` \`confirmationSentAt\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`confirmedAt\` \`confirmedAt\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`recoveryToken\` \`recoveryToken\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`recoverySentAt\` \`recoverySentAt\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`lastSignInAt\` \`lastSignInAt\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneConfirmedAt\` \`phoneConfirmedAt\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`departments\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rooms\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`access\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` DROP FOREIGN KEY \`FK_f59d261f923c4bce57fa9c96f85\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` CHANGE \`memberId\` \`memberId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statuses\` DROP FOREIGN KEY \`FK_d34ed9494768c7a8e21241ca2aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`statuses\` CHANGE \`memberId\` \`memberId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` ADD CONSTRAINT \`FK_f59d261f923c4bce57fa9c96f85\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statuses\` ADD CONSTRAINT \`FK_d34ed9494768c7a8e21241ca2aa\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`statuses\` DROP FOREIGN KEY \`FK_d34ed9494768c7a8e21241ca2aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` DROP FOREIGN KEY \`FK_f59d261f923c4bce57fa9c96f85\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statuses\` CHANGE \`memberId\` \`memberId\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statuses\` ADD CONSTRAINT \`FK_d34ed9494768c7a8e21241ca2aa\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` CHANGE \`memberId\` \`memberId\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` ADD CONSTRAINT \`FK_f59d261f923c4bce57fa9c96f85\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`access\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rooms\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`departments\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneConfirmedAt\` \`phoneConfirmedAt\` timestamp NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`lastSignInAt\` \`lastSignInAt\` timestamp NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`recoverySentAt\` \`recoverySentAt\` timestamp NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`recoveryToken\` \`recoveryToken\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`confirmedAt\` \`confirmedAt\` timestamp NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`confirmationSentAt\` \`confirmationSentAt\` timestamp NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`emailConfirmedAt\` \`emailConfirmedAt\` timestamp NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`DROP TABLE \`companies\``);
  }
}
