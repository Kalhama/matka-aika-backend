import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialiseDatabase1629046699400 implements MigrationInterface {
    name = 'InitialiseDatabase1629046699400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "travel_time_matrix" ("fromID" integer NOT NULL, "toID" integer NOT NULL, "walkTime" integer, "walkDistance" integer, "bikeSlowTime" integer, "bikeFastTime" integer, "bikeDistance" integer, "publicTransportRushhourWaitingHome" integer, "publicTransportRushhourTime" integer, "publicTransportRushhourDistance" integer, "publicTransportMiddayWaitingHome" integer, "publicTransportMiddayTime" integer, "publicTransportMiddayDistance" integer, "carRushhourTime" integer, "carRushhourDistance" integer, "carMiddayTime" integer, "carMiddayDistance" integer, "carSpeedLimitTime" integer, "year" integer NOT NULL, CONSTRAINT "PK_0a9e40932a6993790395f7d071b" PRIMARY KEY ("fromID", "toID"))`
        )
        await queryRunner.query(`CREATE INDEX "IDX_0881ac29085230f7238e188c44" ON "travel_time_matrix" ("fromID") `)
        await queryRunner.query(`CREATE INDEX "IDX_97e3565cb93074eba2bb1d5a0b" ON "travel_time_matrix" ("toID") `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_97e3565cb93074eba2bb1d5a0b"`)
        await queryRunner.query(`DROP INDEX "IDX_0881ac29085230f7238e188c44"`)
        await queryRunner.query(`DROP TABLE "travel_time_matrix"`)
    }
}
