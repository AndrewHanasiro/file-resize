import { Request, Response, Router, NextFunction } from 'express'
import imageRoute from './routes/image'
import pdfRoute from './routes/pdf'

const app = Router()

app.use(imageRoute)
app.use(pdfRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err)
    res.status(500).send(err.message)
  } else {
    next()
  }
})
app.use((req: Request, res: Response) => {
  res.status(404).send('Sorry cant find that')
})

export default app
