import { Request, Response, Router } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'
import { image } from '../../core/image'

const imageRoute = Router()
const ajv = new Ajv()

interface ImageInput {
  file: string
  extension: string
  resolution: number
}

const schema: JSONSchemaType<ImageInput> = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    extension: { type: 'string', enum: ['jpg', 'png'] },
    resolution: {
      type: 'number',
    },
  },
  required: ['file', 'resolution', 'extension'],
  additionalProperties: false,
}

imageRoute.post('/image', async (req: Request, res: Response) => {
  const validate = ajv.compile<ImageInput>(schema)
  if (!validate(req.body)) {
    console.log(validate.errors)
  }
  const { file, extension, resolution }: ImageInput = req.body
  const resp = await image(file, extension, resolution)
  res.status(200).send(resp)
})

export default imageRoute
