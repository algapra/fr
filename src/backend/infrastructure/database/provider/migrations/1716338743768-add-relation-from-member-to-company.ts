import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationFromMemberToCompany1716338743768
  implements MigrationInterface
{
  name = 'AddRelationFromMemberToCompany1716338743768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`members\` ADD \`companyId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_c5c4bc0ef04ce5729481c60b559\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`item\` \`item\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`signature\` \`signature\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`voucherCode\` \`voucherCode\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`voucher\` \`voucher\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL`,
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
      `ALTER TABLE \`companies\` CHANGE \`plan\` \`plan\` varchar(255) NULL`,
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
      `ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_c5c4bc0ef04ce5729481c60b559\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` ADD CONSTRAINT \`FK_f59d261f923c4bce57fa9c96f85\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statuses\` ADD CONSTRAINT \`FK_d34ed9494768c7a8e21241ca2aa\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` ADD CONSTRAINT \`FK_136a2347b3428cc7b4f1baef918\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6f9395c9037632a31107c8a9e58\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6f9395c9037632a31107c8a9e58\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` DROP FOREIGN KEY \`FK_136a2347b3428cc7b4f1baef918\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`statuses\` DROP FOREIGN KEY \`FK_d34ed9494768c7a8e21241ca2aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` DROP FOREIGN KEY \`FK_f59d261f923c4bce57fa9c96f85\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_c5c4bc0ef04ce5729481c60b559\``,
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
      `ALTER TABLE \`companies\` CHANGE \`plan\` \`plan\` varchar(255) NULL DEFAULT 'NULL'`,
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
      `ALTER TABLE \`transactions\` CHANGE \`companyId\` \`companyId\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`voucher\` \`voucher\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`voucherCode\` \`voucherCode\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`signature\` \`signature\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` CHANGE \`item\` \`item\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_c5c4bc0ef04ce5729481c60b559\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` DROP COLUMN \`companyId\``,
    );
  }
}
