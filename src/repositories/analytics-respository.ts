'use server'

import prisma from '@/lib/prisma'
import { CommensalData } from '@/types/queues'
import { Prisma } from '@prisma/client'
import { differenceInMinutes } from 'date-fns'

export type ClientsAmountResult = {
  count: number
  avg: number
  hour?: number
  day?: number
  month?: number
  year: number
}

export async function getClientsAmountAndAvgWaitingTime({
  restaurantSlug,
  day,
  month,
  year,
}: {
  restaurantSlug: string
  day?: number
  month?: number
  year?: number
}) {
  const hourTerm = 'EXTRACT(HOUR FROM a."joinedAt")'
  const dayTerm = 'EXTRACT(DAY FROM a."joinedAt")'
  const monthTerm = 'EXTRACT(MONTH FROM a."joinedAt")'
  const yearTerm = 'EXTRACT(YEAR FROM a."joinedAt")'

  const selectHour = day ? `CAST(${hourTerm} AS INTEGER) AS hour, ` : ''
  const selectDay = month ? `CAST(${dayTerm} AS INTEGER ) AS day, ` : ''
  const selectMonth = year ? `CAST(${monthTerm} AS INTEGER ) AS month, ` : ''
  const selectYear = `CAST(${yearTerm} AS INTEGER) AS year `

  const hourGroupByTerm = day ? `${hourTerm},` : ''
  const dayGroupByTerm = month ? `${dayTerm},` : ''
  const monthGroupByTerm = year ? `${monthTerm},` : ''
  const yearGroupByTerm = yearTerm

  const searchDayTerm = day && month ? `AND ${dayTerm} = ${day}` : ''
  const searchMonthTerm = year && month ? `AND ${monthTerm} = ${month}` : ''
  const searchYearTerm = `AND ${yearTerm} = ${year}`

  const query = `
      SELECT COUNT(a.*) AS count, CAST(AVG(a."waitingTimeMinutes") AS INTEGER) AS avg, ${selectHour} ${selectDay} ${selectMonth} ${selectYear}
      FROM "Restaurant" r, "Analytics" a
      WHERE a."restaurantId" = r.id AND r.slug = '${restaurantSlug}' ${searchDayTerm} ${searchMonthTerm} ${searchYearTerm}
      GROUP BY ${hourGroupByTerm} ${dayGroupByTerm} ${monthGroupByTerm} ${yearGroupByTerm}
      `

  const rawResults: ClientsAmountResult[] =
    await prisma.$queryRaw`${Prisma.raw(query)}`

  return rawResults
}

export async function createClientAnalytics({
  restaurantId,
  client,
  accepted,
}: {
  restaurantId: number
  accepted: boolean
  client: CommensalData
}) {
  const { joinedAt } = client
  const params = accepted
    ? {
        seatedAt: new Date(),
        waitingTimeMinutes: differenceInMinutes(new Date(), joinedAt),
      }
    : {
        canceledAt: new Date(),
        waitingTimeMinutes: differenceInMinutes(new Date(), joinedAt),
      }

  await prisma.analytics.create({
    data: {
      joinedAt,
      restaurantId,
      ...params,
    },
  })
}
