import { MigrationInterface, QueryRunner } from "typeorm";

export class Createtable1719329926889 implements MigrationInterface {
    name = 'Createtable1719329926889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee" ("empid" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_056a1020c22dd862117631b3e09" PRIMARY KEY ("empid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
