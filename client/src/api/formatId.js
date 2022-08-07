export const formatId = (id) => {
  let formatted = String(id).padStart(7, '0')
  formatted = 'tt' + formatted
  return formatted
}
