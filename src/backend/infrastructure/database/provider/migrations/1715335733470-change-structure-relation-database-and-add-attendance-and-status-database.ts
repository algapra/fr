import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStructureRelationDatabaseAndAddAttendanceAndStatusDatabase1715335733470 implements MigrationInterface {
    name = 'ChangeStructureRelationDatabaseAndAddAttendanceAndStatusDatabase1715335733470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_5048f81a92785e2744e22b0e297\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_9b0e4501f7161ebb10c13990e0b\``);
        await queryRunner.query(`ALTER TABLE \`access\` DROP FOREIGN KEY \`FK_400de7b28c723fb136b68e08fac\``);
        await queryRunner.query(`ALTER TABLE \`members\` DROP FOREIGN KEY \`FK_5555ff9841508edbf56854fcf99\``);
        await queryRunner.query(`ALTER TABLE \`members\` DROP FOREIGN KEY \`FK_6984374c612ea865146941308de\``);
        await queryRunner.query(`DROP INDEX \`REL_400de7b28c723fb136b68e08fa\` ON \`access\``);
        await queryRunner.query(`DROP INDEX \`REL_5555ff9841508edbf56854fcf9\` ON \`members\``);
        await queryRunner.query(`DROP INDEX \`REL_6984374c612ea865146941308d\` ON \`members\``);
        await queryRunner.query(`CREATE TABLE \`attendances\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`memberId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`statuses\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`memberId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP COLUMN \`accessId\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP COLUMN \`memberId\``);
        await queryRunner.query(`ALTER TABLE \`access\` DROP COLUMN \`quoteAccess\``);
        await queryRunner.query(`ALTER TABLE \`access\` DROP COLUMN \`departmentId\``);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`full_name\``);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`attendance\``);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`accessId\``);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`departmentId\``);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`fullName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`emailConfirmedAt\` \`emailConfirmedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`confirmationSentAt\` \`confirmationSentAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`confirmedAt\` \`confirmedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recoveryToken\` \`recoveryToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recoverySentAt\` \`recoverySentAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`lastSignInAt\` \`lastSignInAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneConfirmedAt\` \`phoneConfirmedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`departments\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`rooms\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`access\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`members\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`attendances\` ADD CONSTRAINT \`FK_f59d261f923c4bce57fa9c96f85\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`statuses\` ADD CONSTRAINT \`FK_d34ed9494768c7a8e21241ca2aa\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`statuses\` DROP FOREIGN KEY \`FK_d34ed9494768c7a8e21241ca2aa\``);
        await queryRunner.query(`ALTER TABLE \`attendances\` DROP FOREIGN KEY \`FK_f59d261f923c4bce57fa9c96f85\``);
        await queryRunner.query(`ALTER TABLE \`members\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`access\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`rooms\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`departments\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phoneConfirmedAt\` \`phoneConfirmedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`lastSignInAt\` \`lastSignInAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recoverySentAt\` \`recoverySentAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recoveryToken\` \`recoveryToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`confirmedAt\` \`confirmedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`confirmationSentAt\` \`confirmationSentAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`emailConfirmedAt\` \`emailConfirmedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`fullName\``);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`departmentId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`accessId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`attendance\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`full_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`access\` ADD \`departmentId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`access\` ADD \`quoteAccess\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD \`memberId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD \`accessId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`statuses\``);
        await queryRunner.query(`DROP TABLE \`attendances\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6984374c612ea865146941308d\` ON \`members\` (\`departmentId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5555ff9841508edbf56854fcf9\` ON \`members\` (\`accessId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_400de7b28c723fb136b68e08fa\` ON \`access\` (\`departmentId\`)`);
        await queryRunner.query(`ALTER TABLE \`members\` ADD CONSTRAINT \`FK_6984374c612ea865146941308de\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`members\` ADD CONSTRAINT \`FK_5555ff9841508edbf56854fcf99\` FOREIGN KEY (\`accessId\`) REFERENCES \`access\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`access\` ADD CONSTRAINT \`FK_400de7b28c723fb136b68e08fac\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD CONSTRAINT \`FK_9b0e4501f7161ebb10c13990e0b\` FOREIGN KEY (\`memberId\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD CONSTRAINT \`FK_5048f81a92785e2744e22b0e297\` FOREIGN KEY (\`accessId\`) REFERENCES \`access\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
