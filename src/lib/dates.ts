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
      isTimeError: false,
      isOpen: true,
    }
    return acc
  }, {} as WeeklyCalendar)
}
