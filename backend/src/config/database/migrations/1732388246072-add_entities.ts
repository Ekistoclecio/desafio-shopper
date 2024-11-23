import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntities1732388246072 implements MigrationInterface {
    name = 'AddEntities1732388246072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driver" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "vehicle" character varying(255) NOT NULL, "review_rating" integer NOT NULL, "review_comment" text NOT NULL, "price_per_km" numeric(10,2) NOT NULL, "minimum_required_km" integer NOT NULL, CONSTRAINT "CHK_3a5b9834620e3644e57a559724" CHECK ("review_rating" >= 0 AND "review_rating" <= 5), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "customer_id" character varying(255) NOT NULL, "date" date NOT NULL, "origin" character varying(255) NOT NULL, "destination" character varying(255) NOT NULL, "distance" numeric(10,2) NOT NULL, "duration" character varying(255) NOT NULL, "value" numeric(10,2) NOT NULL, "driverId" integer, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "driver"`);
    }

}
