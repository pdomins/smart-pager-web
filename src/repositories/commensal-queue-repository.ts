'use server'

import { assertAndReturn } from '@/lib/assertions'
import { createClient } from '@vercel/kv'

import { unstable_noStore as noStore } from 'next/cache'

type CommensalData = {
  name: string
  commensals: string
}

// TODO
// type PickUpData = {
//   name: string
//   pickupid: string
// }

const kv = createClient({
  url: assertAndReturn(process.env.KV_REST_API_URL),
  token: assertAndReturn(process.env.KV_REST_API_TOKEN),
})

//TODO refactor y modulacion cuando este pickup
export async function addCommensal(
  restaurantSlug: string,
  email: string,
  clientData: CommensalData
) {
  const inList = !!(await kv.zscore(restaurantSlug, email))
  if (inList) {
    console.log('Email already exists in the queue.')
    return
  }
  const score = Date.now()

  await kv.zadd(restaurantSlug, { score, member: email })

  await kv.sadd(email, clientData)
  console.log(`Email ${email} added to the queue.`)
}

//TODO refactor y modulacion cuando este pickup
export async function removeCommensal({
  restaurantSlug,
  email,
}: {
  restaurantSlug: string
  email: string
}) {
  try {
    const removed = await kv.zrem(restaurantSlug, email)

    if (removed) {
      await kv.del(email)
      console.log(`Email ${email} removed from the queue.`)
    } else {
      console.log(`Email ${email} was not found in the queue.`)
    }
  } catch (error) {
    console.error(`An error occurred while removing ${email}:`, error)
  }
}

//TODO refactor y modulacion cuando este pickup
const getCommensalData = async (email: string) => {
  try {
    const clientData = await kv.smembers(email)
    if (!clientData) {
      console.log(`No data found for email ${email}.`)
      return null
    }

    console.log(`Data for email ${email}:`, JSON.stringify(clientData))
    return clientData
  } catch (error) {
    console.error(
      `An error occurred while retrieving data for ${email}:`,
      error
    )
    return null
  }
}

//TODO refactor y modulacion cuando este pickup
const getFirstEmail = async ({
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

    const firstEmail = firstUserArray[0]
    console.log(`First email in the queue: ${firstEmail}`)
    return firstEmail
  } catch (error) {
    console.error(
      'An error occurred while retrieving the first username from the queue:',
      error
    )
    return null
  }
}

//TODO refactor y modulacion cuando este pickup
export async function getFirstCommensal({
  restaurantSlug,
}: {
  restaurantSlug: string
}) {
  noStore()
  const email = await getFirstEmail({ restaurantSlug })
  if (!email) {
    return null
  }
  return getCommensalData(email)
}

//TODO refactor y modulacion cuando este pickup
export async function getAllCommensals({
  restaurantSlug,
}: {
  restaurantSlug: string
}) {
  return await kv.zrange(restaurantSlug, 0, -1)
}
