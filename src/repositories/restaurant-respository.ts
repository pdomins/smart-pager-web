'use server'
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

  const result = await prisma.restaurant.findFirst({
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

export async function deleteRestaurant(id: number) {
  const result = await prisma.restaurant.delete({
    where: {
      id,
    },
  })
  return result
}

export async function deleteRestaurantByEmail(email: string) {
  const result = await prisma.restaurant.delete({
    where: {
      email,
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

export async function updateRestaurantDetails({
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
  const slug = toKebabCase(name) + '-' + id //TODO update this, seq ids are no good
  const locationId = uuid()

  await sql`
  INSERT INTO "Location" ("id", "coordinates", "address")
  VALUES (${locationId}, ST_Point(${coordinates?.lng}, ${coordinates?.lat}), ${address});`

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
  })

  return result
}
