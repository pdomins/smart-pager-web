import {
  CommensalData,
  CommensalDataParams,
  addClient,
  getClientData,
  getPaginatedEmails,
  removeClient,
  updateClient,
} from '@/repositories/queue-repository'

const COMMENSAL_WAITING_LIST = '-waiting-commensal'
const COMMENSAL_CALLED_LIST = '-called-commensal'
const COMMENSAL_WAITING_AMOUNT_LIST = '-amount-waiting-commensal'
const COMMENSAL_CALLED_AMOUNT_LIST = '-amount-called-commensal'

const getCommensalWaitingAmountListKey = ({
  restaurantSlug,
  groupSize,
}: {
  restaurantSlug: string
  groupSize: string
}) => {
  return restaurantSlug + '-' + groupSize + COMMENSAL_WAITING_AMOUNT_LIST
}

const getCommensalWaitingListKey = ({
  restaurantSlug,
}: {
  restaurantSlug: string
}) => {
  return restaurantSlug + COMMENSAL_WAITING_LIST
}

const getCommensalCalledListKey = ({
  restaurantSlug,
}: {
  restaurantSlug: string
}) => {
  return restaurantSlug + COMMENSAL_CALLED_LIST
}

const getCommensalCalledAmountListKey = ({
  restaurantSlug,
  groupSize,
}: {
  restaurantSlug: string
  groupSize: string
}) => {
  return restaurantSlug + '-' + groupSize + COMMENSAL_CALLED_AMOUNT_LIST
}

export async function addCommensal({
  restaurantSlug,
  email,
  clientData,
}: {
  restaurantSlug: string
  email: string
  clientData: CommensalDataParams
}) {
  const data: Omit<CommensalData, 'email'> = {
    joinedAt: new Date(),
    timesCalled: 0,
    ...clientData,
  }
  const response = await addClient({
    lists: [
      getCommensalWaitingListKey({ restaurantSlug }),
      getCommensalWaitingAmountListKey({
        restaurantSlug,
        groupSize: data.groupSize,
      }),
    ],
    email,
    clientData: data,
  })
  console.log(`Email ${email} added to the queue.`)

  return response
}

export async function removeCommensal({
  restaurantSlug,
  client: data,
}: {
  restaurantSlug: string
  client: CommensalData
}) {
  if (data.timesCalled === 0) {
    // waiting
    await removeClient({
      lists: [
        getCommensalWaitingListKey({ restaurantSlug }),
        getCommensalWaitingAmountListKey({
          restaurantSlug,
          groupSize: data.groupSize,
        }),
      ],
      email: data.email,
    })
  } else {
    // called
    await removeClient({
      lists: [
        getCommensalCalledListKey({ restaurantSlug }),
        getCommensalCalledAmountListKey({
          restaurantSlug,
          groupSize: data.groupSize,
        }),
      ],
      email: data.email,
    })
  }
}

type PaginationResult = {
  emails: string[]
  size: number
} | null

export async function getPaginatedCommensals({
  restaurantSlug,
  start,
  end,
  waiting,
  groupSize,
}: {
  restaurantSlug: string
  start: number
  end: number
  waiting: boolean
  groupSize?: string
}) {
  let result: PaginationResult
  if (waiting) {
    if (groupSize) {
      result = await getPaginatedEmails({
        list: getCommensalWaitingAmountListKey({ restaurantSlug, groupSize }),
        start,
        end,
      })
    } else {
      result = await getPaginatedEmails({
        list: getCommensalWaitingListKey({ restaurantSlug }),
        start,
        end,
      })
    }
  } else {
    if (groupSize) {
      result = await getPaginatedEmails({
        list: getCommensalCalledAmountListKey({ restaurantSlug, groupSize }),
        start,
        end,
      })
    } else {
      result = await getPaginatedEmails({
        list: getCommensalCalledListKey({ restaurantSlug }),
        start,
        end,
      })
    }
  }
  if (!result || !result.emails) {
    console.log('Null results or emails for list')
    return { queue: [], size: 0 }
  }
  const emails = result?.emails

  const results = (
    await Promise.all(emails.map((email) => getClientData({ email })))
  ).filter(
    (result): result is CommensalData => result !== null
  ) as CommensalData[]

  return { queue: results, size: result.size }
}

export async function callCommensal({
  client: data,
  restaurantSlug,
}: {
  restaurantSlug: string
  client: CommensalData
}) {
  try {
    await removeCommensal({ restaurantSlug, client: data })

    const updatedData: Omit<CommensalData, 'email'> = {
      ...data,
      timesCalled: data.timesCalled + 1,
    }

    await addClient({
      lists: [
        getCommensalCalledListKey({ restaurantSlug }),
        getCommensalCalledAmountListKey({
          restaurantSlug,
          groupSize: data.groupSize,
        }),
      ],
      email: data.email,
      clientData: updatedData,
    })

    console.log(`Email ${data.email} updated in the queue.`)
  } catch (error) {
    console.error(`An error occurred while removing ${data.email}:`, error)
  }
}

export async function retryCallCommensal({
  client: data,
}: {
  client: CommensalData
}) {
  try {
    await updateClient({ data })

    console.log(`Email ${data.email} updated in the queue.`)
  } catch (error) {
    console.error(`An error occurred while removing ${data.email}:`, error)
  }
}
