import { api } from '../lib/axios'

interface CreateLinkBody {
  originalUrl: string
  shortUrl: string
}

export interface CreateLinkResponse {
  link: {
    id: string
  }
}

export async function createLink({ originalUrl, shortUrl }: CreateLinkBody) {
  const response = await api.post<CreateLinkResponse>(`/links`, {
    originalUrl,
    shortUrl,
  })

  return response.data
}
