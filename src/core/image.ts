import { existsSync, mkdir, readFile, unlink } from 'fs'
import path from 'path'
import { promisify } from 'util'
import sharp from 'sharp'
import { randomBytes } from 'crypto'

const mkdirPromise = promisify(mkdir)
const unlinkPromise = promisify(unlink)
const readFilePromise = promisify(readFile)

export async function image(
  file: string,
  extension: string,
  resolution: number
) {
  try {
    const tempFolder = path.join(process.cwd(), 'temp')
    const hasTempFolder = existsSync(tempFolder)
    if (!hasTempFolder) {
      await mkdirPromise(tempFolder)
    }

    const hash = randomBytes(32).toString('hex')

    const compressFilePath = path.join(
      process.cwd(),
      'temp',
      `compress-${hash}.${extension}`
    )

    const buffer = Buffer.from(file, 'base64')

    switch (extension) {
      case 'jpg':
        await sharp(buffer)
          .jpeg({ quality: resolution })
          .toFile(compressFilePath)
        break
      case 'png':
        await sharp(buffer)
          .png({ quality: resolution })
          .toFile(compressFilePath)
        break
      default:
        throw new Error('extension not permitted')
    }

    const compressFileBase64 = await readFilePromise(compressFilePath, 'base64')

    await unlinkPromise(compressFilePath) // comment this if you want to maintain the pdf output

    return compressFileBase64
  } catch (error) {
    throw error
  }
}
