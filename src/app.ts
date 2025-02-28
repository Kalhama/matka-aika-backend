import express, { Request, Response } from 'express'
import path from 'path'
import csv from 'csv-parser'
import shp from 'shpjs'
import { readFile } from 'fs/promises'
import fs from 'fs'
import cors from 'cors'
import { z } from 'zod'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

// Middleware to parse JSON
app.use(express.json())

type CSVRow = {
  from_id: string
  to_id: string
  walk_t: string
  walk_d: string
  bike_s_t: string
  bike_f_t: string
  bike_d: string
  pt_r_tt: string
  pt_r_t: string
  pt_r_d: string
  pt_m_tt: string
  pt_m_t: string
  pt_m_d: string
  car_r_t: string
  car_r_d: string
  car_m_t: string
  car_m_d: string
  car_sl_t: string
}

enum ValidColumns {
  walk_t = 'walk_t',
  walk_d = 'walk_d',
  bike_s_t = 'bike_s_t',
  bike_f_t = 'bike_f_t',
  bike_d = 'bike_d',
  pt_r_tt = 'pt_r_tt',
  pt_r_t = 'pt_r_t',
  pt_r_d = 'pt_r_d',
  pt_m_tt = 'pt_m_tt',
  pt_m_t = 'pt_m_t',
  pt_m_d = 'pt_m_d',
  car_r_t = 'car_r_t',
  car_r_d = 'car_r_d',
  car_m_t = 'car_m_t',
  car_m_d = 'car_m_d',
  car_sl_t = 'car_sl_t'
}

const travelTimeQuerySchema = z.object({
  id: z.string(),
  column: z.nativeEnum(ValidColumns)
})

// Travel Time endpoint
app.get('/travelTime', async (req: Request, res: Response) => {
  try {
    const parseResult = travelTimeQuerySchema.safeParse(req.query)
    if (!parseResult.success) {
      res.status(400).json({ error: 'Both id and column parameters are required' })
      return
    }

    const { id, column } = parseResult.data

    // Construct the file path
    // Extract the first 4 digits of the ID and add 'xxx'
    const idPrefix = id.substring(0, 4) + 'xxx'
    const filePath = path.join('data', 'TravelTimeMatrix', idPrefix, `travel_times_to_ ${id}.txt`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'Travel time data not found for the specified ID' })
      return
    }

    // Parse CSV and filter s
    const results: Record<string, string> = {}

    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data: CSVRow) => {
        results[data.from_id] = data[column]
      })
      .on('end', () => {
        res.append('Cache-Control', 'public; max-age=31536000')
        res.json(results)
      })
      .on('error', (error) => {
        console.error('Error parsing CSV:', error)
        res.status(500).json({ error: 'Error parsing travel time data' })
      })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/YKRgrid', async (req: Request, res: Response) => {
  try {
    res.append('Cache-Control', 'public; max-age=31536000')
    const data = await readFile('data/YKRGrid.zip')
    const geojson = await shp(data)
    res.status(200).json(geojson)
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
