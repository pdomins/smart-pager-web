'use server'

import { assertAndReturn } from '@/lib/assertions'
import { createClient } from '@vercel/kv'

import { unstable_noStore as noStore } from 'next/cache'

const PICK_UP_LIST = '-pickup'

export type CommensalDataParams = {
  name: string
  groupSize: string
  phoneNumber: string
  description: string
}

export type CommensalData = CommensalDataParams & {
  joinedAt: Date
  email: string
  timesCalled: number
}

type PickUpData = {
  name: string
  pickupid: string
}

const kv = createClient({
  url: assertAndReturn(process.env.REDIS_REST_API_URL),
  token: assertAndReturn(process.env.REDIS_REST_API_TOKEN),
})

export async function addClient({
  lists,
  email,
  clientData,
}: {
  lists: string[]
  email: string
  clientData: CommensalDataParams | PickUpData
}) {
  noStore()
  const isMember = await kv.smembers(email)
  if (isMember.length !== 0) return false

  const score = Date.now()

  await Promise.all(
    lists.map((list) => kv.zadd(list, { score, member: email }))
  )
  await kv.sadd(email, clientData)

  return true
}

export async function removeClient({
  lists,
  email,
}: {
  lists: string[]
  email: string
}) {
  noStore()
  try {
    await Promise.all(lists.map((list) => kv.zrem(list, email)))
  } catch (error) {
    console.error(
      `An error occurred while removing ${email} from lists:`,
      error
    )
  }

  try {
    await kv.del(email)
  } catch (error) {
    console.error(`An error occurred while removing ${email}:`, error)
  }
}

export const getClientData = async ({ email }: { email: string }) => {
  noStore()
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

export const getPaginatedEmails = async ({
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
    const size = await kv.zcount(list, "-inf", "+inf")
    if (emails.length === 0) {
      console.log('The queue is currently empty.')
      return {emails, size}
    }

    console.log({ msg: `Emails in the queue: ${emails}`, start, end })
    return { emails, size }
  } catch (error) {
    console.error(
      'An error occurred while retrieving the first username from the queue:',
      error
    )
    return null
  }
}

// export async function getAllCommensals({
//   restaurantSlug,
// }: {
//   restaurantSlug: string
// }) {
//   noStore()
//   console.log(restaurantSlug + COMMENSAL_LIST)
//   return await kv.zrange(restaurantSlug + COMMENSAL_LIST, 0, -1)
// }

export async function updateClient({ data }: { data: CommensalData }) {
  noStore()
  const updatedData: Omit<CommensalData, 'email'> = {
    ...data,
    timesCalled: data.timesCalled + 1,
  }

  const email = data.email
  await kv.del(email)
  await kv.sadd(email, updatedData)
}

// esto se borra despues, es ahora para que siga funcionando la parte que todavia no actualice
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
  await addClient({ lists: [restaurantSlug + PICK_UP_LIST], email, clientData })
  return true
}
