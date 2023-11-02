import { exec } from 'child_process'
import { existsSync, mkdir, readFile, unlink, writeFile } from 'fs'
import path from 'path'
import { promisify } from 'util'
import { randomBytes } from 'crypto'

const execPromise = promisify(exec)
const mkdirPromise = promisify(mkdir)
const unlinkPromise = promisify(unlink)
const writeFilePromise = promisify(writeFile)
const readFilePromise = promisify(readFile)

export enum Resolution {
  screen = 'screen',
  ebook = 'ebook',
  printer = 'printer',
  prepress = 'prepress',
  default = 'default',
}

export async function pdf(files: string[], resolution: Resolution) {
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
      `compress-${hash}.pdf`
    )

    const filesPath = files.map((elem, idx) => {
      return path.join(process.cwd(), 'temp', `original-${idx}-${hash}.pdf`)
    })
    const listPromises = files.map((elem, idx) => {
      const originalFilePath = path.join(
        process.cwd(),
        'temp',
        `original-${idx}.pdf`
      )
      return writeFilePromise(originalFilePath, elem, 'base64')
    })

    await Promise.all(listPromises)
    const command = `gs \
    -sDEVICE=pdfwrite \
    -dPDFSETTINGS=/${resolution} \
    -dNOPAUSE \
    -dQUIET \
    -sOutputFile="${compressFilePath}" \
    -dBATCH ${filesPath.join(' ')}`
    console.log(command)
    await execPromise(command)

    const compressFileBase64 = await readFilePromise(compressFilePath, 'base64')

    filesPath.forEach(async (path) => {
      await unlinkPromise(path)
    })

    await unlinkPromise(compressFilePath) // comment this if you want to maintain the pdf output

    return compressFileBase64
  } catch (error) {
    throw error
  }
}
