import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRideDateType1732422778569 implements MigrationInterface {
    name = 'FixRideDateType1732422778569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "date" date NOT NULL`);
    }

}
