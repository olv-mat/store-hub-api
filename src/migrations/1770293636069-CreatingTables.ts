import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingTables1770293636069 implements MigrationInterface {
    name = 'CreatingTables1770293636069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('Admin', 'Owner')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'Owner', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."stores_category_enum" AS ENUM('Clothing', 'Perfumery', 'Sneakers', 'Accessories')`);
        await queryRunner.query(`CREATE TABLE "stores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "category" "public"."stores_category_enum" NOT NULL, "phone" character varying(15) NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(20) NOT NULL, "neighborhood" character varying(100) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "slots" integer NOT NULL DEFAULT '10', "owner_id" uuid NOT NULL, CONSTRAINT "REL_c03f4f73d83362cabb34dfa941" UNIQUE ("owner_id"), CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59f9237ea1f716dcebf39abea9" ON "stores" ("state", "city", "neighborhood") `);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('Shirts', 'Pants', 'Dresses', 'Jackets', 'Fragrances', 'Skincare', 'Makeup', 'Casual Shoes', 'Sport Shoes', 'Boots', 'Watches', 'Jewelry', 'Bags', 'Belts')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "category" "public"."products_category_enum" NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "image" text NOT NULL, "in_stock" boolean NOT NULL DEFAULT true, "stock_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "store_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_594ca159cc17128d062999845f" ON "products" ("in_stock") `);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_68863607048a1abd43772b314ef" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_68863607048a1abd43772b314ef"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_594ca159cc17128d062999845f"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59f9237ea1f716dcebf39abea9"`);
        await queryRunner.query(`DROP TABLE "stores"`);
        await queryRunner.query(`DROP TYPE "public"."stores_category_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
