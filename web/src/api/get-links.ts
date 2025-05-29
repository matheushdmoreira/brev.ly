import { api } from '../lib/axios'

export interface Link {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: string
}

export interface GetLinksResponse {
  links: Link[]
}

export async function getLinks() {
  const response = await api.get<GetLinksResponse>('/links')

  return response.data
}
