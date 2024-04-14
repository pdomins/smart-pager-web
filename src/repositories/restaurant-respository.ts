'use server'
import prisma from '@/lib/prisma'
import { toKebabCase } from '@/lib/string'
import { unstable_noStore as noStore } from 'next/cache'

export async function getRestaurants() {
  return await prisma.restaurants.findMany()
}

export async function getRestaurantById(id: number) {
  noStore()

  const result = await prisma.restaurants.findFirst({
    where: {
      id,
    },
  })

  return result
}

export async function getRestaurantByEmail(email: string) {
  noStore()

  const result = await prisma.restaurants.findFirst({
    where: {
      email,
    },
  })

  return result
}

export async function getRestaurantBySlug(slug: string) {
  noStore()

  const result = await prisma.restaurants.findFirst({
    where: {
      slug,
    },
  })

  return result
}

export async function createRestaurant(email: string, name: string) {
  const result = await prisma.restaurants.create({
    data: {
      email,
      name,
    },
  })

  return result
}

export async function deleteRestaurant(id: number) {
  const result = await prisma.restaurants.delete({
    where: {
      id,
    },
  })
  return result
}

export async function deleteRestaurantByEmail(email: string) {
  const result = await prisma.restaurants.delete({
    where: {
      email,
    },
  })
  return result
}

export async function updateRestaurantMenu(id: number, menuURL: string) {
  const result = await prisma.restaurants.update({
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

  const { menu } = await prisma.restaurants.findFirstOrThrow({
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

  const { menu } = await prisma.restaurants.findFirstOrThrow({
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
  menuURL,
  name,
}: {
  id: number
  menuURL: string
  name: string
}) {
  const slug = toKebabCase(name) + '-' + id

  // we should update the menu here as well

  const result = await prisma.restaurants.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      menu: menuURL,
    },
  })

  return result
}
