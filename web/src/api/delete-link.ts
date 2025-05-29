import { api } from '../lib/axios'

export interface DeleteLinkParams {
  linkId: string
}

export async function deleteLink({ linkId }: DeleteLinkParams) {
  await api.delete(`/links/${linkId}`)
}
