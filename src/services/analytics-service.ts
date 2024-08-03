import { ANALYTICS_FILTER_TYPE } from '@/lib/analytics'
import { months } from '@/lib/dates'
import {
  createClientAnalytics,
  getClientsAmountAndAvgWaitingTime,
} from '@/repositories/analytics-respository'
import { getFullRestaurantBySlug } from '@/repositories/restaurant-respository'
import { CommensalData } from '@/types/queues'
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
      // DAY
      label = Array.from({ length: 24 }, (_, i) => `${i}:00`)
      day = date.getDate()
      month = date.getMonth() + 1
      year = date.getFullYear()
      break
    }
  }

  const clientsAmount = await getClientsAmountAndAvgWaitingTime({
    restaurantSlug,
    day,
    month,
    year,
  })

  if (clientsAmount.length === 0) {
    return {
      label,
      avgWaitingTimeArray: [],
      restaurantClientsArray: [],
    }
  }

  const restaurantClientsArray = new Array(label.length).fill(0)
  const avgWaitingTimeArray = new Array(label.length).fill(0)

  switch (filter) {
    case ANALYTICS_FILTER_TYPE.MONTH: {
      clientsAmount.forEach((item) => {
        const idx = Number(item.day) || 0
        restaurantClientsArray[idx] = Number(item.count)
        avgWaitingTimeArray[idx] = Number(item.avg)
      })
      break
    }
    case ANALYTICS_FILTER_TYPE.YEAR: {
      clientsAmount.forEach((item) => {
        const idx = Number(item.month) || 0
        restaurantClientsArray[idx] = Number(item.count)
        avgWaitingTimeArray[idx] = Number(item.avg)
      })
      break
    }
    default: {
      clientsAmount.forEach((item) => {
        const idx = Number(item.hour) || 0
        restaurantClientsArray[idx] = Number(item.count)
        avgWaitingTimeArray[idx] = Number(item.avg)
      })
      break
    }
  }

  return {
    label,
    avgWaitingTimeArray,
    restaurantClientsArray,
  }
}

export async function createAnalytics({
  restaurantSlug,
  client,
  accepted,
}: {
  restaurantSlug: string
  client: CommensalData
  accepted: boolean
}) {
  const { id: restaurantId } = await getFullRestaurantBySlug(restaurantSlug)

  await createClientAnalytics({ restaurantId, client, accepted })
}
