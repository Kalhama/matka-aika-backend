// import { DateTime } from 'luxon'
import {
    Get,
    JsonController,
    QueryParam,
    Param,
    BadRequestError,
    InternalServerError,
    ContentType
} from 'routing-controllers'
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
        @QueryParam('from') from: object,
        @QueryParam('to') to: object,
    ): Promise<unknown> {
        const conn = getConnection(process.env.NODE_ENV)
        
        if ((from && to) || (!from && !to)) {
            throw new Error('One and only one from to and from parameters must be defined')
        }

        const param = from || to

        const ret = await conn.query(
            `
            SELECT *
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
        var data = fs.readFileSync('data/MetropAccess_YKR_grid.zip');

        return shp.parseZip(data)
    }
}
