// import { DateTime } from 'luxon'
import { Get, JsonController, QueryParam, BadRequestError, InternalServerError, ContentType } from 'routing-controllers'
import { getConnection } from 'typeorm'
import * as fs from 'fs'
import * as shp from 'shpjs'

@JsonController()
export class Endpoints {
    @Get('/')
    @ContentType('text/plain')
    public async index(): Promise<string> {
        const conn = getConnection(process.env.NODE_ENV)

        if (!conn.isConnected) {
            throw new InternalServerError('Problem with DB')
        }

        return 'OK'
    }

    @Get('/travelTimes')
    public async getCandles(
        @QueryParam('from') from: number,
        @QueryParam('to') to: number,
        @QueryParam('excludeCols') excludeCols: string[]
    ): Promise<unknown> {
        const cols = [
            'fromID',
            'toID',
            'walkTime',
            'walkDistance',
            'bikeSlowTime',
            'bikeFastTime',
            'bikeDistance',
            'publicTransportRushhourWaitingHome',
            'publicTransportRushhourTime',
            'publicTransportRushhourDistance',
            'publicTransportMiddayWaitingHome',
            'publicTransportMiddayTime',
            'publicTransportMiddayDistance',
            'carRushhourTime',
            'carRushhourDistance',
            'carMiddayTime',
            'carMiddayDistance',
            'carSpeedLimitTime',
            'year'
        ]

        if (!excludeCols) excludeCols = []

        const selectCols = cols.filter((el) => excludeCols.indexOf(el) < 0)

        const conn = getConnection(process.env.NODE_ENV)

        if ((from && to) || (!from && !to)) {
            throw new Error('One and only one from to and from parameters must be defined')
        }

        const param = from || to

        const ret = await conn.query(
            `
            SELECT ${selectCols.map((col) => `"${col}"`).join(', ')}
            FROM "travel_time_matrix"
            WHERE "${from ? 'fromID' : 'toID'}" = $1
            LIMIT 15000
        `,
            [param]
        )

        if (ret.length >= 15000) {
            throw new BadRequestError('Too many rows')
        }

        return ret
    }

    @Get('/YKRGrid')
    public async getYKRGrid(): Promise<unknown> {
        // TODO use async await
        const data = fs.readFileSync('YKRGrid.zip')

        return shp.parseZip(data)
    }
}
