'use server'

import { Coordinates } from '@/components/maps'
import prisma from '@/lib/prisma'
import { toKebabCase } from '@/lib/string'
import uuid from '@/lib/uuid'
import { CoordinatesWithAddress } from '@/types/location'
import { UpdateRestaurantData } from '@/types/restaurant'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

export async function getRestaurants() {
  return await prisma.restaurant.findMany()
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

export async function getRestaurantBySlug(slug: string) {
  noStore()

  const result = await prisma.restaurant.findFirstOrThrow({
    where: {
      slug,
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
