import { ANALYTICS_FILTER_TYPE } from '@/lib/analytics'
import { months } from '@/lib/dates'
import {
  getClientsAmount,
  getClientsAvgWaitingTime,
} from '@/repositories/analytics-respository'
import { getDaysInMonth } from 'date-fns'

export async function getAnalytics({
  date,
  filter,
  restaurantSlug,
}: {
  date: Date
  filter: string
  restaurantSlug: string
}) {
  let day: number | undefined = undefined
  let month: number | undefined = undefined
  let year: number | undefined = undefined
  let label: string[] = []

  switch (filter) {
    case ANALYTICS_FILTER_TYPE.MONTH: {
      label = Array.from({ length: getDaysInMonth(date) }, (_, i) => `${i + 1}`)
      month = date.getMonth() + 1
      year = date.getFullYear()
      break
    }
    case ANALYTICS_FILTER_TYPE.YEAR: {
      label = months
      year = date.getFullYear()
      break
    }
    default: {
      label = Array.from({ length: 24 }, (_, i) => `${i}:00`)
      day = date.getDate()
      month = date.getMonth() + 1
      year = date.getFullYear()
      break
    }
  }

  const avgWaitingTime = await getClientsAvgWaitingTime({
    restaurantSlug,
    day,
    month,
    year,
  })

  const clientsAmount = await getClientsAmount({
    restaurantSlug,
    day,
    month,
    year,
  })

  console.log({ avgWaitingTime, clientsAmount })
  return {
    label,
    avgWaitingTimeArray: label.map(() => Math.random()),
    restaurantClientsArray: label.map(() => Math.random()),
  }
}
