'use server'

import { assertAndReturn } from '@/lib/assertions'
import { createClient } from '@vercel/kv'

import { unstable_noStore as noStore } from 'next/cache'

const PICK_UP_LIST = '-pickup'
const COMMENSAL_LIST = '-commensal'

type CommensalData = {
  name: string
  groupSize: string
  phoneNumber: string
  description: string
}

type PickUpData = {
  name: string
  pickupid: string
}

const kv = createClient({
  url: assertAndReturn(process.env.REDIS_REST_API_URL),
  token: assertAndReturn(process.env.REDIS_REST_API_TOKEN),
})

//TODO kv.smembers(email) SOLO PODES ESTAR ANOTADO EN UNA UNICA FILA
export async function addCommensal({
  restaurantSlug,
  email,
  clientData,
}: {
  restaurantSlug: string
  email: string
  clientData: CommensalData
}) {
  noStore()
  const isMember = await kv.smembers(email)
  if (isMember.length !== 0) return false
  const data = { status: 'waiting', ...clientData }
  await addClient({
    list: restaurantSlug + COMMENSAL_LIST,
    email,
    clientData: data,
  })
  return true
}

//TODO kv.smembers(email) SOLO PODES ESTAR ANOTADO EN UNA UNICA FILA
export async function addPickUp({
  restaurantSlug,
  email,
  clientData,
}: {
  restaurantSlug: string
  email: string
  clientData: PickUpData
}) {
  noStore()
  const isMember = await kv.smembers(email)
  if (isMember.length !== 0) return false
  await addClient({ list: restaurantSlug + PICK_UP_LIST, email, clientData })
  return true
}

async function addClient({
  list,
  email,
  clientData,
}: {
  list: string
  email: string
  clientData: CommensalData | PickUpData
}) {
  const score = Date.now()

  await kv.zadd(list, { score, member: email })
  await kv.sadd(email, clientData)
  console.log(`Email ${email} added to the queue.`)
}

export async function removeCommensal({
  restaurantSlug,
  email,
}: {
  restaurantSlug: string
  email: string
}) {
  await removeClient({ list: restaurantSlug + COMMENSAL_LIST, email })
}

export async function removePickUp({
  restaurantSlug,
  email,
}: {
  restaurantSlug: string
  email: string
}) {
  await removeClient({ list: restaurantSlug + PICK_UP_LIST, email })
}

async function removeClient({ list, email }: { list: string; email: string }) {
  try {
    const removed = await kv.zrem(list, email)

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

const getClientData = async ({ email }: { email: string }) => {
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

const getFirstEmail = async ({ list }: { list: string }) => {
  noStore()
  try {
    const firstUserArray: string[] = await kv.zrange(list, 0, 1)
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

export async function getFirstCommensal({
  restaurantSlug,
}: {
  restaurantSlug: string
}) {
  noStore()
  const email = await getFirstEmail({ list: restaurantSlug + COMMENSAL_LIST })
  if (!email) {
    return null
  }
  return getClientData({ email })
}

export async function getFirstPickUp({
  restaurantSlug,
}: {
  restaurantSlug: string
}) {
  noStore()
  const email = await getFirstEmail({ list: restaurantSlug + PICK_UP_LIST })
  if (!email) {
    return null
  }
  return getClientData({ email })
}

export async function getAllCommensals({
  restaurantSlug,
}: {
  restaurantSlug: string
}) {
  noStore()
  return await kv.zrange(restaurantSlug + COMMENSAL_LIST, 0, -1)
}

export async function getAllPickUps({
  restaurantSlug,
}: {
  restaurantSlug: string
}) {
  noStore()
  return await kv.zrange(restaurantSlug + PICK_UP_LIST, 0, -1)
}
