'use server'

import { assertAndReturn } from '@/lib/assertions'
import { CommensalData, PickUpData } from '@/types/queues'
import { createClient } from '@vercel/kv'

import { unstable_noStore as noStore } from 'next/cache'

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
  clientData: CommensalData | PickUpData
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
    const clientData = (await kv.smembers(email))[0] as unknown as
      | CommensalData
      | PickUpData
      | null

    if (!clientData) {
      console.log(`No data found for email ${email}.`)
      return null
    }

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
    const size = await kv.zcount(list, '-inf', '+inf')
    if (emails.length === 0) {
      console.log('The queue is currently empty.')
      return { emails, size }
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

export async function updateClient({
  data,
}: {
  data: CommensalData | PickUpData
}) {
  noStore()
  const updatedData = {
    ...data,
    timesCalled: data.timesCalled + 1,
  }

  const email = data.email
  await kv.del(email)
  await kv.sadd(email, updatedData)
}
