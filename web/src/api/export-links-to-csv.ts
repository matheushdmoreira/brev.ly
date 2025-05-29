import { api } from '../lib/axios'

export interface ExportLinksToCSVResponse {
  url: string
}

export async function exportLinksToCSV() {
  const response = await api.get<ExportLinksToCSVResponse>('/links/export')

  return response.data
}
