import dayjs from 'dayjs'

export function formatDateToCsv(date: Date): string {
  const base = dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS')

  return `${base}000`
}
