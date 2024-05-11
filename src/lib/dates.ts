import { WeeklyCalendar } from '@/components/restaurants/sign-up/forms/restaurant-form'

export const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
]

export const defaultWeek = () => {
  return daysOfWeek.reduce((acc, day) => {
    acc[day] = {
      openingTime: null,
      closingTime: null,
      isOpen: true,
    }
    return acc
  }, {} as WeeklyCalendar)
}

export const isRestaurantOpen = (calendar: WeeklyCalendar) => {
  const now = new Date()
  const dayNames = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  const todayName = dayNames[now.getDay()]

  const dayInfo = calendar[todayName]
  if (!dayInfo || !dayInfo.isOpen) {
    return false
  }

  if (dayInfo.openingTime && dayInfo.closingTime) {
    const currentTime = now.getHours() * 100 + now.getMinutes()
    const openingTime = parseInt(dayInfo.openingTime.replace(':', ''))
    const closingTime = parseInt(dayInfo.closingTime.replace(':', ''))

    return currentTime >= openingTime && currentTime <= closingTime
  }

  return false
}
