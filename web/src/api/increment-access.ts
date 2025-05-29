import { api } from '../lib/axios'

export interface IncrementAccessParams {
  linkId: string
}

export async function incrementAccess({ linkId }: IncrementAccessParams) {
  await api.patch(`/links/${linkId}/increment`)
}
