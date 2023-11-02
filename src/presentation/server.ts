import cors from 'cors'
import express, { Request, Response, urlencoded, json } from 'express'
import helmet from 'helmet'
import app from './app'

const server = express()

// SECURITY
server.use(helmet())
server.use(
  cors({
    origin: /http:\/\/localhost:\d+$/,
  })
)
server.disable('x-powered-by')

// PARSE BODY TO OBJECT
server.use(urlencoded({ extended: false, limit: '50mb' }))
server.use(json({ limit: '50mb' }))

server.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK')
})

// APPLICATION ENDPOINT
server.use(app)

// SERVING
const PORT = 5000
server.listen(PORT, () => {
  console.warn(`Server running on: ${PORT}`)
})

export default server
