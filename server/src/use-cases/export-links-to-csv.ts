import { Upload } from '@aws-sdk/lib-storage'
import { format } from '@fast-csv/format'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { PassThrough } from 'stream'

import { env } from '@/env'
import { r2 } from '@/infra/storage/client'
import { LinksRepository } from '@/repositories/links-repository'
import { formatDateToCsv } from '@/utils/format-date-to-csv'

interface ExportLinksToCsvUseCaseResponse {
  url: string
}

export class ExportLinksToCsvUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(): Promise<ExportLinksToCsvUseCaseResponse> {
    const links = await this.linksRepository.streamAll()

    const csvStream = format({ headers: true })
    const contentStream = new PassThrough()

    csvStream.pipe(contentStream)

    for await (const link of links) {
      csvStream.write({
        ID: link.id,
        originalUrl: link.originalUrl,
        shortUrl: link.shortUrl,
        accessCount: link.accessCount,
        createdAt: formatDateToCsv(link.createdAt),
      })
    }

    csvStream.end()

    const formattedDate = dayjs().format('YYYYMMDDTHHmmssSSSS')
    const uniqueFileName = `exports/${randomUUID()}-${formattedDate}linkscsv.csv`

    const upload = new Upload({
      client: r2,
      params: {
        Key: uniqueFileName,
        Bucket: env.CLOUDFLARE_BUCKET,
        Body: contentStream,
        ContentType: 'text/csv',
      },
    })

    await upload.done()

    const publicUrl = new URL(
      uniqueFileName,
      env.CLOUDFLARE_PUBLIC_URL,
    ).toString()

    return { url: publicUrl }
  }
}
