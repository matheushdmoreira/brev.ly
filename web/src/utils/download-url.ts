export const downloadUrl = async (url: string) => {
  const link = document.createElement('a')
  link.href = url

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
