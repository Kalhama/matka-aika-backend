import { createConnection } from 'typeorm'
import * as fs from 'fs'
import * as Papa from 'papaparse'
import { TravelTimeMatrix } from './entity/TravelTimeMatrix'
import * as util from 'util'
import * as glob from 'glob'
import * as _ from 'lodash'
import * as cliProgress from 'cli-progress'

const readFile = util.promisify(fs.readFile);

class PopulateDatabase {

    private async listMatrixFiles(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            glob('data/HelsinkiTravelTimeMatrix2018/*xxx/*.txt', (err, data) => {            
                if (err) reject(err)
                resolve(data)
            })
        })
    }

        private async getMatrixFile(filePath: string): Promise<any> {
            const file = fs.createReadStream(filePath);
    
            return new Promise(resolve => {
              Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                fastMode: true,
                transformHeader: (_header, i) => {
                    const headerArr =  ['fromID', 'toID', 'walkTime', 'walkDistance', 'bikeSlowTime', 'bikeFastTime', 'bikeDistance', 'publicTransportRushhourWaitingHome', 'publicTransportRushhourTime', 'publicTransportRushhourDistance', 'publicTransportMiddayWaitingHome', 'publicTransportMiddayTime', 'publicTransportMiddayDistance', 'carRushhourTime', 'carRushhourDistance', 'carMiddayTime', 'carMiddayDistance', 'carSpeedLimitTime']
                    return headerArr[i]
                },
                transform: (value, _i) => {
                    if (value === '-1') return null
                    else return Number(value)
                },
                complete: results => {                  
                  results.data.forEach(el => el['year'] = 2018)
    
                  resolve(results.data);
                }
              });
            });
          };
    

    public async execute()  {
        const NODE_ENV = process.env.NODE_ENV || 'development'        

        const conn = await createConnection(NODE_ENV)
        await conn.query('TRUNCATE TABLE "travel_time_matrix";')
        
        const travelTimeMatrixRepo = conn.getRepository(TravelTimeMatrix)
    
        // TODO better logging
        const matrixFiles = await this.listMatrixFiles()

        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        bar.start(matrixFiles.length, 0);
    
        for (const [i, fn] of matrixFiles.entries()) {        
            const data = await this.getMatrixFile(fn)

            await Promise.all(_.chunk(data, 100).map(chunk => {
                return travelTimeMatrixRepo
                    .createQueryBuilder()
                    .insert()
                    .values(chunk)
                    .execute()
            }))
    
            bar.update(i + 1);
        }
    
        bar.stop();
    
        process.env.NODE_ENV !== 'development' && process.exit()
    }
}


new PopulateDatabase().execute()
