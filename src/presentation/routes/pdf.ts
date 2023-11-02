import { Request, Response, Router } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'
import { Resolution, pdf } from '../../core/pdf'

const pdfRoute = Router()
const ajv = new Ajv()

interface PdfInput {
  files: string[]
  resolution: Resolution
}

const schema: JSONSchemaType<PdfInput> = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    resolution: {
      type: 'string',
      enum: [
        Resolution.default,
        Resolution.ebook,
        Resolution.prepress,
        Resolution.printer,
        Resolution.screen,
      ],
    },
  },
  required: ['files', 'resolution'],
  additionalProperties: false,
}

pdfRoute.post('/pdf', async (req: Request, res: Response) => {
  const validate = ajv.compile<PdfInput>(schema)
  if (!validate(req.body)) {
    console.log(validate.errors)
  }
  const { files, resolution }: PdfInput = req.body
  const resp = await pdf(files, resolution)
  res.status(200).send(resp)
})

export default pdfRoute
