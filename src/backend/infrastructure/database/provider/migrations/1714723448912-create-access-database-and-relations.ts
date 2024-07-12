import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714723448912 implements MigrationInterface {
    name = 'Migrations1714723448912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`access\` (\`id\` varchar(36) NOT NULL, \`roleName\` varchar(255) NOT NULL, \`quoteAccess\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`departmentId\` varchar(36) NULL, UNIQUE INDEX \`REL_400de7b28c723fb136b68e08fa\` (\`departmentId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD \`accessId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`emailConfirmedAt\` \`emailConfirmedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`confirmationSentAt\` \`confirmationSentAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`confirmedAt\` \`confirmedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recoveryToken\` \`recoveryToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recoverySentAt\` \`recoverySentAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`lastSignInAt\` \`lastSignInAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneConfirmedAt\` \`phoneConfirmedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`rooms\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`departments\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD CONSTRAINT \`FK_5048f81a92785e2744e22b0e297\` FOREIGN KEY (\`accessId\`) REFERENCES \`access\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`access\` ADD CONSTRAINT \`FK_400de7b28c723fb136b68e08fac\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`access\` DROP FOREIGN KEY \`FK_400de7b28c723fb136b68e08fac\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_5048f81a92785e2744e22b0e297\``);
        await queryRunner.query(`ALTER TABLE \`departments\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`rooms\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneConfirmedAt\` \`phoneConfirmedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`lastSignInAt\` \`lastSignInAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recoverySentAt\` \`recoverySentAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recoveryToken\` \`recoveryToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`confirmedAt\` \`confirmedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`confirmationSentAt\` \`confirmationSentAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`emailConfirmedAt\` \`emailConfirmedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP COLUMN \`accessId\``);
        await queryRunner.query(`DROP INDEX \`REL_400de7b28c723fb136b68e08fa\` ON \`access\``);
        await queryRunner.query(`DROP TABLE \`access\``);
    }

}
