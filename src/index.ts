import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import config from './config'
import cors from 'cors'
import Route from './routes/api'
import { migrations } from './database/migrations'

const app: express.Application = express()
const port = config.port || 3000

//PARSING MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const corsOptions = {
  origin: config.uri,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// Define all routes...
app.use('/api', Route)

app.get('/', (_req: Request, res: Response) => {
  res.send(`<h1>Welcome to ${config.name}</h1>`)
})

// getMyClasses()

// migrations().then(() => {
//     app.listen(port, function () {
//         console.log(`starting app on: ${config.uri}`);
//     });
// }).catch(err => {
//     console.log(err)
// })
migrations()
app.listen(port, function () {
  console.log(`starting app on: ${config.uri}`)
})

export default app
