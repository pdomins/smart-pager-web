export const pattern = /^\+?54\s*11\s*\d{8,10}$/
export const areaCode = '54'

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '')

  const countryCode = cleanedPhoneNumber.slice(0, 2)
  const areaCode = cleanedPhoneNumber.slice(2, 4)
  const localNumber = cleanedPhoneNumber.slice(4)

  return `+${countryCode} ${areaCode} ${localNumber}`
}
