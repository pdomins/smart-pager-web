import {
  addClient,
  getClientData,
  getPaginatedEmails,
  removeClient,
  updateClient,
} from '@/repositories/queue-repository'
import { PaginationResult, PickUpData, PickUpDataParams } from '@/types/queues'

const PICK_UP_WAITING_LIST = '-waiting-pickup'
const PICK_UP_CALLED_LIST = '-called-pickup'

const getPickUpWaitingListKey = ({
  restaurantSlug,
}: {
  restaurantSlug: string
}) => {
  return restaurantSlug + PICK_UP_WAITING_LIST
}

const getPickUpCalledListKey = ({
  restaurantSlug,
}: {
  restaurantSlug: string
}) => {
  return restaurantSlug + PICK_UP_CALLED_LIST
}

export async function addPickUp({
  restaurantSlug,
  email,
  clientData,
}: {
  restaurantSlug: string
  email: string
  clientData: PickUpDataParams
}) {
  const data: PickUpData = {
    joinedAt: new Date(),
    timesCalled: 0,
    email,
    ...clientData,
  }
  const response = await addClient({
    lists: [getPickUpWaitingListKey({ restaurantSlug })],
    email,
    clientData: data,
  })
  console.log(`Email ${email} added to the pickup queue.`)
  return response
}

export async function removePickUp({
  restaurantSlug,
  order: data,
}: {
  restaurantSlug: string
  order: PickUpData
}) {
  if (data.timesCalled === 0) {
    // waiting
    await removeClient({
      lists: [getPickUpWaitingListKey({ restaurantSlug })],
      email: data.email,
    })
  } else {
    // called
    await removeClient({
      lists: [getPickUpCalledListKey({ restaurantSlug })],
      email: data.email,
    })
  }
}

export async function getPaginatedPickUps({
  restaurantSlug,
  start,
  end,
  waiting,
}: {
  restaurantSlug: string
  start: number
  end: number
  waiting: boolean
}) {
  let result: PaginationResult
  if (waiting) {
    result = await getPaginatedEmails({
      list: getPickUpWaitingListKey({ restaurantSlug }),
      start,
      end,
    })
  } else {
    result = await getPaginatedEmails({
      list: getPickUpCalledListKey({ restaurantSlug }),
      start,
      end,
    })
  }
  if (!result || !result.emails) {
    console.log('Null results or emails for list')
    return { queue: [], size: 0 }
  }
  const emails = result?.emails

  const results = (
    await Promise.all(emails.map((email) => getClientData({ email })))
  ).filter((result): result is PickUpData => result !== null) as PickUpData[]

  return { queue: results, size: result.size }
}

export async function callPickUp({
  order: data,
  restaurantSlug,
}: {
  restaurantSlug: string
  order: PickUpData
}) {
  try {
    await removePickUp({ restaurantSlug, order: data })

    const updatedData: PickUpData = {
      ...data,
      timesCalled: data.timesCalled + 1,
    }

    await addClient({
      lists: [getPickUpCalledListKey({ restaurantSlug })],
      email: data.email,
      clientData: updatedData,
    })

    console.log(`Email ${data.email} updated in the pickup queue.`)
  } catch (error) {
    console.error(`An error occurred while removing ${data.email}:`, error)
  }
}

export async function retryCallPickUp({
  order: data,
}: {
  order: PickUpData
}) {
  try {
    await updateClient({ data })

    console.log(`Email ${data.email} updated in the pickup queue.`)
  } catch (error) {
    console.error(`An error occurred while removing ${data.email}:`, error)
  }
}
