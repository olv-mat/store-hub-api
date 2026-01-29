import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockUpdatedAtColumn1769703503828 implements MigrationInterface {
    name = 'AddStockUpdatedAtColumn1769703503828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "stock_updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock_updated_at"`);
    }

}
