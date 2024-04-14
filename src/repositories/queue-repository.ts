'use server'

import { assertAndReturn } from '@/lib/assertions'
import { createClient } from '@vercel/kv'

import { unstable_noStore as noStore } from 'next/cache'

const PICK_UP_LIST = '-pickup'
const COMMENSAL_LIST = '-commensal'

type CommensalDataParams = {
  name: string
  groupSize: string
  phoneNumber: string
  description: string
}

export type CommensalData = CommensalDataParams & {
  status: 'waiting' | 'called'
  joinedAt: Date
  email: string
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
  clientData: CommensalDataParams
}) {
  noStore()
  const isMember = await kv.smembers(email)
  if (isMember.length !== 0) return false
  const data: Omit<CommensalData, 'email'> = {
    status: 'waiting',
    joinedAt: new Date(),
    ...clientData,
  }
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
  clientData: CommensalDataParams | PickUpData
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
  noStore()
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
    const rawData = (await kv.smembers(email))[0] as unknown as Omit<
      CommensalData,
      'email'
    > | null
    if (!rawData) {
      console.log(`No data found for email ${email}.`)
      return null
    }
    const clientData: CommensalData = { email, ...rawData }

    console.log(`Data for email ${email}:`, clientData)
    return clientData
  } catch (error) {
    console.error(
      `An error occurred while retrieving data for ${email}:`,
      error
    )
    return null
  }
}

const getPaginatedEmails = async ({
  list,
  start,
  end,
}: {
  list: string
  start: number
  end: number
}) => {
  noStore()
  try {
    const emails: string[] = await kv.zrange(list, start, end)
    if (emails.length === 0) {
      console.log('The queue is currently empty.')
      return null
    }

    console.log({ msg: `Emails in the queue: ${emails}`, start, end })
    return emails
  } catch (error) {
    console.error(
      'An error occurred while retrieving the first username from the queue:',
      error
    )
    return null
  }
}

export async function getPaginatedCommensals({
  restaurantSlug,
  start,
  end,
}: {
  restaurantSlug: string
  start: number
  end: number
}) {
  noStore()
  const emails = await getPaginatedEmails({
    list: restaurantSlug + COMMENSAL_LIST,
    start,
    end,
  })
  if (!emails) {
    return null
  }

  const results = (
    await Promise.all(emails.map((email) => getClientData({ email })))
  ).filter(
    (result): result is CommensalData => result !== null
  ) as CommensalData[]

  return results
}

export async function getPaginatedPickUps({
  restaurantSlug,
  start,
  end,
}: {
  restaurantSlug: string
  start: number
  end: number
}) {
  noStore()
  const email = await getPaginatedEmails({
    list: restaurantSlug + PICK_UP_LIST,
    start,
    end,
  })
  if (!email) {
    return null
  }
  // return getClientData({ email })
}

export async function getAllCommensals({
  restaurantSlug,
}: {
  restaurantSlug: string
}) {
  noStore()
  console.log(restaurantSlug + COMMENSAL_LIST)
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

export async function updateCommensalStatus({ email }: { email: string }) {
  noStore()
  try {
    const data = await getClientData({ email })
    if (!data) {
      console.error(`No data found for email ${email}.`)
      return
    }

    const updatedData: Omit<CommensalData, 'email'> = {
      ...data,
      status: 'called',
    }
    await kv.del(email)
    await kv.sadd(email, updatedData)

    console.log(`Email ${email} updated in the queue.`)
  } catch (error) {
    console.error(`An error occurred while removing ${email}:`, error)
  }
}
