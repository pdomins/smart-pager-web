import {
  OpenCloseInterval,
  RestaurantFormState,
  WeeklyCalendar,
} from '@/components/restaurants/sign-up/forms/restaurant-form'

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
      intervals: [
        {
          openingTime: null,
          closingTime: null,
        },
      ],
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

  const currentTime = now.getHours() * 100 + now.getMinutes()

  return dayInfo.intervals.some((interval) => {
    if (interval.openingTime && interval.closingTime) {
      const openingTime = parseInt(interval.openingTime.replace(':', ''))
      const closingTime = parseInt(interval.closingTime.replace(':', ''))
      return currentTime >= openingTime && currentTime <= closingTime
    }
    return false
  })
}

export const isValidCalendar = (formState: RestaurantFormState) => {
  for (const day in formState.weeklyCalendar) {
    const dayInfo = formState.weeklyCalendar[day]
    if (dayInfo.isOpen) {
      if (dayInfo.intervals.length === 0) {
        return false
      }

      for (const interval of dayInfo.intervals) {
        if (!interval.openingTime || !interval.closingTime) {
          return false
        }
      }
    }
  }
  return true
}

const mergeIntervals = (
  intervals: OpenCloseInterval[]
): OpenCloseInterval[] => {
  if (intervals.length < 2) return intervals

  // Sort intervals by opening time
  intervals.sort(
    (a, b) =>
      parseInt(a.openingTime!.replace(':', '')) -
      parseInt(b.openingTime!.replace(':', ''))
  )

  const merged: OpenCloseInterval[] = []
  let previous = intervals[0]

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i]
    if (
      parseInt(previous.closingTime!.replace(':', '')) >=
      parseInt(current.openingTime!.replace(':', ''))
    ) {
      // There is overlap, merge intervals
      previous = {
        openingTime: previous.openingTime,
        closingTime:
          parseInt(previous.closingTime!.replace(':', '')) >
          parseInt(current.closingTime!.replace(':', ''))
            ? previous.closingTime
            : current.closingTime,
      }
    } else {
      // No overlap
      merged.push(previous)
      previous = current
    }
  }
  merged.push(previous)
  return merged
}

export const copyAndCleanCalendar = (
  calendar: WeeklyCalendar
): WeeklyCalendar => {
  const newCalendar: WeeklyCalendar = {}

  for (const day in calendar) {
    const dayInfo = calendar[day]
    newCalendar[day] = {
      ...dayInfo,
      intervals: mergeIntervals(dayInfo.intervals),
    }
  }

  return newCalendar
}
