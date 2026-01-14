import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingProductsTable1768397244279 implements MigrationInterface {
    name = 'CreatingProductsTable1768397244279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "image" text NOT NULL, "in_stock" boolean NOT NULL DEFAULT true, "store_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_594ca159cc17128d062999845f" ON "products" ("in_stock") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_68863607048a1abd43772b314ef" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_68863607048a1abd43772b314ef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_594ca159cc17128d062999845f"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
