import { api } from '../lib/axios'

export interface GetLinkByShortenedUrlQuery {
  shortenedUrl: string
}

export interface GetLinkByShortenedUrlResponse {
  link: {
    id: string
    originalUrl: string
  }
}

export async function getLinkByShortenedUrl({
  shortenedUrl,
}: GetLinkByShortenedUrlQuery) {
  const response = await api.get<GetLinkByShortenedUrlResponse>(
    `/links/${shortenedUrl}`,
  )

  return response.data
}
