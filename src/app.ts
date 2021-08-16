import { useExpressServer } from 'routing-controllers'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as morgan from 'morgan'

const main = async () => {
    const PORT = process.env.PORT || 3000
    const NODE_ENV = process.env.NODE_ENV || 'development'

    await createConnection(NODE_ENV)

    const app = express() // Business logic

    app.use(morgan('combined')) // Logging

    useExpressServer(app, {
        cors: true,
        controllers: [__dirname + '/controllers/**/{*.ts,*.js}']
    })

    app.listen(PORT)
    console.log(`metropaccess-visualiser-api listening port ${PORT} in ${NODE_ENV} mode`)
}

main()
