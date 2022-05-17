import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity()
export class TravelTimeMatrix {
    @PrimaryColumn({ type: 'integer' })
    @Index()
    fromID: number

    @PrimaryColumn({ type: 'integer' })
    @Index()
    toID: number

    @Column({ nullable: true, type: 'smallint' })
    walkTime: number

    @Column({ nullable: true, type: 'integer' })
    walkDistance: number

    @Column({ nullable: true, type: 'smallint' })
    bikeSlowTime: number

    @Column({ nullable: true, type: 'smallint' })
    bikeFastTime: number

    @Column({ nullable: true, type: 'integer' })
    bikeDistance: number

    @Column({ nullable: true, type: 'smallint' })
    publicTransportRushhourWaitingHome: number

    @Column({ nullable: true, type: 'smallint' })
    publicTransportRushhourTime: number

    @Column({ nullable: true, type: 'integer' })
    publicTransportRushhourDistance: number

    @Column({ nullable: true, type: 'smallint' })
    publicTransportMiddayWaitingHome: number

    @Column({ nullable: true, type: 'smallint' })
    publicTransportMiddayTime: number

    @Column({ nullable: true, type: 'integer' })
    publicTransportMiddayDistance: number

    @Column({ nullable: true, type: 'smallint' })
    carRushhourTime: number

    @Column({ nullable: true, type: 'integer' })
    carRushhourDistance: number

    @Column({ nullable: true, type: 'smallint' })
    carMiddayTime: number

    @Column({ nullable: true, type: 'integer' })
    carMiddayDistance: number

    @Column({ nullable: true, type: 'smallint' })
    carSpeedLimitTime: number

    @Column({ type: 'smallint' })
    year: number
}
