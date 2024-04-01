'use server'

import { assertAndReturn } from '@/lib/assertions'
import { createClient } from '@vercel/kv'

import { unstable_noStore as noStore } from 'next/cache'

type QueueElem = {
  example1: string
  example2: string
  // todo
}

const kv = createClient({
  url: assertAndReturn(process.env.KV_REST_API_URL),
  token: assertAndReturn(process.env.KV_REST_API_TOKEN),
})

export async function add({
  restaurantSlug,
  username,
}: {
  restaurantSlug: string
  username: string
}) {
  const inList = !!(await kv.zscore(restaurantSlug, username))
  if (inList) {
    console.log('Username already exists in the queue.')
    return
  }
  const score = Date.now()

  await kv.zadd(restaurantSlug, { score, member: username })
  const values: QueueElem = {
    example1: 'hello',
    example2: 'world',
  }
  await kv.sadd(username, values)
  console.log(`Username ${username} added to the queue.`)
}

export async function remove({
  restaurantSlug,
  username,
}: {
  restaurantSlug: string
  username: string
}) {
  try {
    const removed = await kv.zrem(restaurantSlug, username)

    if (removed) {
      await kv.del(username)
      console.log(`Username ${username} removed from the queue.`)
    } else {
      console.log(`Username ${username} was not found in the queue.`)
    }
  } catch (error) {
    console.error(`An error occurred while removing ${username}:`, error)
  }
}

const getUserData = async (username: string) => {
  try {
    const userData = await kv.smembers(username)
    if (!userData) {
      console.log(`No data found for username ${username}.`)
      return null
    }

    console.log(`Data for username ${username}:`, JSON.stringify(userData))
    return userData
  } catch (error) {
    console.error(
      `An error occurred while retrieving data for ${username}:`,
      error
    )
    return null
  }
}

const getFirstUsername = async ({
  restaurantSlug,
}: {
  restaurantSlug: string
}) => {
  noStore()
  try {
    const firstUserArray: string[] = await kv.zrange(restaurantSlug, 0, 1)
    if (firstUserArray.length === 0) {
      console.log('The queue is currently empty.')
      return null
    }

    const firstUsername = firstUserArray[0]
    console.log(`First username in the queue: ${firstUsername}`)
    return firstUsername
  } catch (error) {
    console.error(
      'An error occurred while retrieving the first username from the queue:',
      error
    )
    return null
  }
}

export async function getFirst({ restaurantSlug }: { restaurantSlug: string }) {
  noStore()
  const firstUsername = await getFirstUsername({ restaurantSlug })
  if (!firstUsername) {
    return null
  }
  return getUserData(firstUsername)
}

export async function getAll({ restaurantSlug }: { restaurantSlug: string }) {
  return await kv.zrange(restaurantSlug, 0, -1)
}
