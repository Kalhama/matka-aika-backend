import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeNumberTypes1652748699227 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "travel_time_matrix"
                ALTER COLUMN "walkTime" TYPE smallint,
                ALTER COLUMN "bikeSlowTime" TYPE smallint,
                ALTER COLUMN "bikeFastTime" TYPE smallint,
                ALTER COLUMN "publicTransportRushhourWaitingHome" TYPE smallint,
                ALTER COLUMN "publicTransportRushhourTime" TYPE smallint,
                ALTER COLUMN "publicTransportMiddayWaitingHome" TYPE smallint,
                ALTER COLUMN "publicTransportMiddayTime" TYPE smallint,
                ALTER COLUMN "carRushhourTime" TYPE smallint,
                ALTER COLUMN "carMiddayTime" TYPE smallint,
                ALTER COLUMN "carSpeedLimitTime" TYPE smallint,
                ALTER COLUMN "year" TYPE smallint;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "travel_time_matrix"
            ALTER COLUMN "walkTime" TYPE integer,
            ALTER COLUMN "bikeSlowTime" TYPE integer,
            ALTER COLUMN "bikeFastTime" TYPE integer,
            ALTER COLUMN "publicTransportRushhourWaitingHome" TYPE integer,
            ALTER COLUMN "publicTransportRushhourTime" TYPE integer,
            ALTER COLUMN "publicTransportMiddayWaitingHome" TYPE integer,
            ALTER COLUMN "publicTransportMiddayTime" TYPE integer,
            ALTER COLUMN "carRushhourTime" TYPE integer,
            ALTER COLUMN "carMiddayTime" TYPE integer,
            ALTER COLUMN "carSpeedLimitTime" TYPE integer,
            ALTER COLUMN "year" TYPE integer;
    `)
    }
}
