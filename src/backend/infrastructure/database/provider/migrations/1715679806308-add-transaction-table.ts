import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTransactionTable1715679806308 implements MigrationInterface {
  name = 'AddTransactionTable1715679806308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transaction_entity\` (\`id\` varchar(36) NOT NULL, \`invoice\` varchar(100) NOT NULL, \`item\` text NULL, \`amount\` bigint NOT NULL DEFAULT '0', \`status\` enum ('declined', 'pending', 'success', 'expired') NOT NULL DEFAULT 'pending', \`signature\` varchar(255) NULL, \`username\` varchar(255) NOT NULL, \`voucherCode\` varchar(255) NULL, \`voucher\` text NULL, \`processed\` tinyint NOT NULL DEFAULT '0', \`paymentMethod\` varchar(25) NOT NULL DEFAULT '', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`email\` \`email\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`address\` \`address\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`phone\` \`phone\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`memberCount\` \`memberCount\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6f9395c9037632a31107c8a9e58\``,
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
      `ALTER TABLE \`users\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL`,
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
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6f9395c9037632a31107c8a9e58\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6f9395c9037632a31107c8a9e58\``,
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
      `ALTER TABLE \`users\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL DEFAULT 'NULL'`,
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
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6f9395c9037632a31107c8a9e58\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`memberCount\` \`memberCount\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`DROP TABLE \`transaction_entity\``);
  }
}
