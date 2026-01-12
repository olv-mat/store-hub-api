import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingTables1768228488772 implements MigrationInterface {
    name = 'CreatingTables1768228488772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'owner')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'owner', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "stores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "phone" character varying(15) NOT NULL, "street" character varying(100) NOT NULL, "number" character varying(20) NOT NULL, "complement" character varying(100), "neighborhood" character varying(100) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "postal_code" character varying(20), "country" character varying(2) NOT NULL, "owner_id" uuid NOT NULL, CONSTRAINT "REL_c03f4f73d83362cabb34dfa941" UNIQUE ("owner_id"), CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3266324c1543d82944dc2809d4" ON "stores" ("city", "state") `);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3266324c1543d82944dc2809d4"`);
        await queryRunner.query(`DROP TABLE "stores"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
