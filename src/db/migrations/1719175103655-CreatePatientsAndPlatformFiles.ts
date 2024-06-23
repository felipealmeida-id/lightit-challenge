import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatientsAndPlatformFiles1719175103655 implements MigrationInterface {
    name = 'CreatePatientsAndPlatformFiles1719175103655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`platform_file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`file\` blob NOT NULL, \`fileName\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`documentPhotoId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`patient\` ADD CONSTRAINT \`FK_c3469e0468750c06208952c158f\` FOREIGN KEY (\`documentPhotoId\`) REFERENCES \`platform_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`patient\` DROP FOREIGN KEY \`FK_c3469e0468750c06208952c158f\``);
        await queryRunner.query(`DROP TABLE \`patient\``);
        await queryRunner.query(`DROP TABLE \`platform_file\``);
    }

}
