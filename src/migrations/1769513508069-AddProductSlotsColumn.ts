import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductSlotsColumn1769513508069 implements MigrationInterface {
    name = 'AddProductSlotsColumn1769513508069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" ADD "product_slots" integer NOT NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "product_slots"`);
    }

}
