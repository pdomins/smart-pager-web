export const pattern = /^\+?54\s*11\s*\d{8,10}$/
export const areaCode = '54'

export const formatPhoneNumber = (phoneNumber: string) => {
    const countryCode = phoneNumber.slice(0, 2)
    const areaCode = phoneNumber.slice(2, 4)
    const localNumber = phoneNumber.slice(4)
  
    return `+${countryCode} ${areaCode} ${localNumber}`
  }