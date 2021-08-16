import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity()
export class TravelTimeMatrix {
    @PrimaryColumn()
    @Index()
    fromID: number
    
    @PrimaryColumn()
    @Index()
    toID: number

    @Column({ nullable: true })
    walkTime: number
    
    @Column({ nullable: true })
    walkDistance: number
    
    @Column({ nullable: true })
    bikeSlowTime: number
    
    @Column({ nullable: true })
    bikeFastTime: number
    
    @Column({ nullable: true })
    bikeDistance: number
    
    @Column({ nullable: true })
    publicTransportRushhourWaitingHome: number
    
    @Column({ nullable: true })
    publicTransportRushhourTime: number
    
    @Column({ nullable: true })
    publicTransportRushhourDistance: number
    
    @Column({ nullable: true })
    publicTransportMiddayWaitingHome: number
    
    @Column({ nullable: true })
    publicTransportMiddayTime: number
    
    @Column({ nullable: true })
    publicTransportMiddayDistance: number
    
    @Column({ nullable: true })
    carRushhourTime: number
    
    @Column({ nullable: true })
    carRushhourDistance: number
    
    @Column({ nullable: true })
    carMiddayTime: number
    
    @Column({ nullable: true })
    carMiddayDistance: number
    
    @Column({ nullable: true })
    carSpeedLimitTime: number

    @Column()
    year: number
}
