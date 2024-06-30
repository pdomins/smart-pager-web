'use server'

import { Coordinates } from '@/components/maps'
import { FoodType } from '@/lib/food'
import prisma from '@/lib/prisma'
import { toKebabCase } from '@/lib/string'
import uuid from '@/lib/uuid'
import { CoordinatesWithAddress } from '@/types/location'
import { UpdateRestaurantData } from '@/types/restaurant'
import { Prisma } from '@prisma/client'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

type Restaurants = Awaited<ReturnType<typeof getRestaurants>>

export async function getRestaurants({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) {
  const skip = page * pageSize
  const restaurants = await prisma.restaurant.findMany({
    skip,
    take: pageSize,
    where: {
      authorized: true,
    },
    orderBy: {
      sponsored: 'desc',
    },
    select: {
      slug: true,
      name: true,
      email: true,
      operatingHours: true,
      type: true,
      menu: true,
      avgTimePerTable: true,
      picture: true,
      sponsored: true,
      location: {
        select: {
          address: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  })
  return restaurants
}

type RawRestaurantResult = {
  slug: string
  name: string
  email: string
  operatingHours: Prisma.JsonValue
  type: string
  menu: string
  avgTimePerTable: string
  picture: string
  sponsored: boolean
  address: string
  latitude: number
  longitude: number
}

function removeQuotes(inputString: string): string {
  return inputString.replace(/["']/g, '')
}

export async function getRestaurantsSearch({
  page,
  pageSize,
  search: searchTerm,
  category,
  distance,
  latitude,
  longitude,
}: {
  page: number
  pageSize: number
  search?: string
  category?: FoodType
  distance?: number
  latitude?: number
  longitude?: number
}) {
  const skip = page * pageSize
  const curedSearchTerm = searchTerm ? removeQuotes(searchTerm) : ''

  const categoryCondition = category ? `AND r.type = '${category as string}'` : ''

  const distanceCondition =
    distance && latitude && longitude
      ? `AND ST_DWITHIN(l.coordinates::geography, ST_POINT(${longitude}, ${latitude})::geography, ${distance * 1000})` // st_dwithin works in meters (do NOT remove the *1000 ). We MUST cast to ::geography since we use srid 0 (default, we did not set a custom srid) so the points are geometries and not geographies. TODO: update the srid to geometry 4326
      : ''

  const searchTermCondition = searchTerm
    ? `AND similarity(r.name, '${curedSearchTerm}') > 0.2`
    : ''

  const searchTermOrder = searchTerm
    ? `, similarity(r.name, '${curedSearchTerm}') DESC`
    : ''

  const query = `
    SELECT r.slug, r.name, r.email, r."operatingHours" AS "operatingHours", r.type, r.menu, r."avgTimePerTable" AS "avgTimePerTable", r.picture, r.sponsored, l.address, l.latitude, l.longitude
    FROM "Restaurant" r, "Location" l
    WHERE r."locationId" = l.id AND r.authorized = true ${categoryCondition} ${searchTermCondition} ${distanceCondition}
    ORDER BY r.sponsored DESC ${searchTermOrder}
    LIMIT ${pageSize} OFFSET ${skip}
  `

  console.log(query)

  const rawResults: RawRestaurantResult[] =
    await prisma.$queryRaw`${Prisma.raw(query)}`

  const results: Restaurants = rawResults.map((row) => ({
    slug: row.slug,
    name: row.name,
    email: row.email,
    operatingHours: row.operatingHours,
    type: row.type,
    menu: row.menu,
    avgTimePerTable: row.avgTimePerTable,
    picture: row.picture,
    sponsored: row.sponsored,
    location: {
      address: row.address,
      latitude: row.latitude,
      longitude: row.longitude,
    },
  }))

  return results
}

export async function getRestaurantById(id: number) {
  noStore()

  const result = await prisma.restaurant.findFirst({
    where: {
      id,
    },
  })

  return result
}

export async function getRestaurantByEmail(email: string) {
  noStore()

  const result = await prisma.restaurant.findFirst({
    where: {
      email,
    },
  })

  return result
}

export async function getFullRestaurantBySlug(slug: string) {
  noStore()

  return await prisma.restaurant.findFirstOrThrow({
    where: { slug },
  })
}

export async function getRestaurantBySlug(slug: string) {
  noStore()

  const result = await prisma.restaurant.findFirstOrThrow({
    where: {
      slug,
    },
    select: {
      slug: true,
      name: true,
      email: true,
      operatingHours: true,
      type: true,
      menu: true,
      avgTimePerTable: true,
      picture: true,
      location: {
        select: {
          address: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  })

  return result
}

export async function createRestaurant(email: string, name: string) {
  const result = await prisma.restaurant.create({
    data: {
      email,
      name,
    },
  })

  return result
}

export async function updateRestaurantMenu(id: number, menuURL: string) {
  const result = await prisma.restaurant.update({
    where: {
      id,
    },
    data: {
      menu: menuURL,
    },
  })
  return result
}

export async function getRestaurantMenu(id: number) {
  noStore()

  const { menu } = await prisma.restaurant.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      menu: true,
    },
  })

  return menu
}

export async function getRestaurantMenuBySlug(slug: string) {
  noStore()

  const { menu } = await prisma.restaurant.findFirstOrThrow({
    where: {
      slug,
    },
    select: {
      menu: true,
    },
  })

  return menu
}

export async function getRestaurantWithLocationByEmail(email: string) {
  noStore()

  const result = await prisma.restaurant.findFirst({
    where: {
      email,
    },
    include: {
      location: {
        select: {
          address: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  })

  if (result) {
    const { location, ...restaurantData } = result
    if (location) {
      return {
        coordinates: {
          lng: location.longitude,
          lat: location.latitude,
        } as Coordinates,
        address: location.address,
        ...restaurantData,
      }
    }
    return { coordinates: null as Coordinates, address: '', ...restaurantData }
  }
  return null
}

const removePreviousLocationIfExists = async ({
  restaurantId,
}: {
  restaurantId: number
}) =>
  await prisma.$transaction(async (prisma) => {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: { locationId: true },
    })

    if (restaurant && restaurant.locationId) {
      await prisma.location.delete({
        where: { id: restaurant.locationId },
      })

      await prisma.restaurant.update({
        where: { id: restaurantId },
        data: { locationId: null },
      })
    }
  })

const updateRestaurantDetails = async ({
  id,
  name,
  coordinates,
  address,
  ...dataToUpdate
}: {
  id: number
  name: string
} & Partial<UpdateRestaurantData> &
  CoordinatesWithAddress) => {
  const slug = toKebabCase(name) + '-' + id //TODO update this, seq ids are no good
  let locationId: string | undefined = uuid()

  if (coordinates) {
    removePreviousLocationIfExists({ restaurantId: id })
    await sql`
  INSERT INTO "Location" ("id", "coordinates", "latitude" , "longitude", "address")
  VALUES (${locationId}, ST_Point(${coordinates.lng}, ${coordinates.lat}), ${coordinates.lat}, ${coordinates.lng}, ${address});`
  } else {
    locationId = undefined
  }

  const result = await prisma.restaurant.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      locationId,
      ...dataToUpdate,
    },
    include: {
      location: {
        select: {
          address: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  })

  return result
}

export async function updateRestaurant({
  id,
  name,
  coordinates,
  address,
  ...dataToUpdate
}: {
  id: number
  name: string
} & Partial<UpdateRestaurantData> &
  CoordinatesWithAddress) {
  noStore()
  const result = await updateRestaurantDetails({
    id,
    name,
    coordinates,
    address,
    ...dataToUpdate,
  })

  const { location, ...restaurantData } = result
  if (location) {
    return {
      coordinates: {
        lng: location.longitude,
        lat: location.latitude,
      } as Coordinates,
      address: location.address,
      ...restaurantData,
    }
  }
  return { coordinates: null as Coordinates, address: '', ...restaurantData }
}
