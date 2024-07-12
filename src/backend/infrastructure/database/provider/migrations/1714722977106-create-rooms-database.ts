import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomsDatabase1714722977106 implements MigrationInterface {
    name = 'CreateRoomsDatabase1714722977106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rooms\` (\`id\` varchar(36) NOT NULL, \`idRoom\` varchar(255) NOT NULL, \`roomName\` varchar(255) NOT NULL, \`floor\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`rooms\``);
    }

}
