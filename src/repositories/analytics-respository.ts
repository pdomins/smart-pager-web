// SELECT "createdAt", EXTRACT(HOUR FROM "createdAt") AS YEAR FROM "Restaurant" WHERE id = 5;
'use server'

// import prisma from '@/lib/prisma'
// import { Prisma } from '@prisma/client'

export async function getClientsAvgWaitingTime({
  restaurantSlug,
  hour,
  day,
  month,
  year,
}: {
  restaurantSlug: string
  hour?: number
  day?: number
  month?: number
  year?: number
}) {
  return { restaurantSlug, hour, day, month, year }
}

export async function getClientsAmount({
  restaurantSlug,
  hour,
  day,
  month,
  year,
}: {
  restaurantSlug: string
  hour?: number
  day?: number
  month?: number
  year?: number
}) {
  // SELECT "createdAt", EXTRACT(HOUR FROM "createdAt") AS YEAR FROM "Restaurant" WHERE id = 5;
  //   const hourTerm = hour ? 'EXTRACT(HOUR FROM a."joinedAt")' : ''
  //   const dayTerm = day ? 'EXTRACT(DAY FROM a."joinedAt")' : ''
  //   const monthTerm = month ? 'EXTRACT(MONTH FROM a."joinedAt")' : ''
  //   const yearTerm = month ? 'EXTRACT(YEAR FROM a."joinedAt")' : ''

  //   const selectHour = hour ? `${hourTerm} AS hour, ` : ''
  //   const selectDay = day ? `${dayTerm} AS day, ` : ''
  //   const selectMonth = month ? `${monthTerm} AS month, ` : ''
  //   const selectYear = year ? `${yearTerm} AS year ` : ''

  //   const hourGroupByTerm = hour ? 'EXTRACT(HOUR FROM a."joinedAt"),' : ''
  //   const dayGroupByTerm = day ? 'EXTRACT(DAY FROM a."joinedAt"),' : ''
  //   const monthGroupByTerm = month ? 'EXTRACT(MONTH FROM a."joinedAt"),' : ''
  //   const yearGroupByTerm = month ? 'EXTRACT(YEAR FROM a."joinedAt")' : ''

  //   const searchDayTerm =
  //     day && month ? `AND EXTRACT(DAY FROM a."joinedAt") = ${day}` : ''
  //   const searchMonthTerm =
  //     year && month ? `AND EXTRACT(MONTH FROM a."joinedAt") = ${month}` : ''
  //   const searchYearTerm = year
  //     ? `AND EXTRACT(YEAR FROM a."joinedAt") = ${year}`
  //     : ''

  //   const query = `
  //     SELECT COUNT(a.*), ${selectHour} ${selectDay} ${selectMonth} ${selectYear}
  //     FROM "Restaurant" r, "Analytics" a
  //     WHERE a."restaurantId" = r.id AND r.slug = '${restaurantSlug}' ${searchDayTerm} ${searchMonthTerm} ${searchYearTerm}
  //     GROUP BY ${hourGroupByTerm} ${dayGroupByTerm} ${monthGroupByTerm} ${yearGroupByTerm}
  //     `

  //   console.log(query)
  //   const rawResults = await prisma.$queryRaw`${Prisma.raw(query)}`
  //   console.log(query, rawResults)

  return { restaurantSlug, hour, day, month, year }
}
