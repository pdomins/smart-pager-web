import { CommensalData, CommensalDataParams, PickUpData } from '@/types/queues'
import {
  addCommensal as kvAddCommensal,
  callCommensal as kvCallCommensal,
  removeCommensal as kvRemoveCommensal,
  retryCallCommensal as kvRetryCallCommensal,
} from './kv/commensal-queue-service'
import {
  callPickUp as kvCallPickUp,
  removePickUp as kvRemovePickUp,
  retryCallPickUp as kvRetryCallPickUp,
} from '@/services/kv/pickup-queue-service'
import {
  sendPickUpCanceledEmail,
  sendPickUpReadyEmail,
  sendPickUpReadyRetryEmail,
  sendReservationCanceledFromAppEmail,
  sendReservationCanceledEmail,
  sendTableCanceledEmail,
  sendTableReadyEmail,
  sendTableReadyRemainderEmail,
  sendAddedToQueueFromAppEmail,
  sendAddedToQueueEmail,
} from '@/repositories/email-repository'
import { getClientData as kvGetClientData } from '@/repositories/queue-repository'
import { getFullRestaurantBySlug } from '@/repositories/restaurant-respository'
import {
  sendReservationCanceledNotification,
  sendTableCanceledNotification,
  sendTableReadyNotification,
  sendTableReadyRemainderNotification,
} from '@/repositories/notification-repository'
import { createAnalytics } from './analytics-service'

export async function callCommensal({
  restaurantName,
  restaurantSlug,
  client,
}: {
  restaurantName: string
  restaurantSlug: string
  client: CommensalData
}) {
  await kvCallCommensal({ restaurantSlug, client })
  await sendTableReadyEmail({ restaurantName, ...client })
  if (client.messagingToken && client.mobileAuthToken)
    await sendTableReadyNotification({
      messagingToken: client.messagingToken,
      mobileAuthToken: client.mobileAuthToken,
    })
}

export async function retryCallCommensal({
  restaurantName,
  client,
}: {
  restaurantName: string
  client: CommensalData
}) {
  await kvRetryCallCommensal({ client })
  await sendTableReadyRemainderEmail({ restaurantName, ...client })
  if (client.messagingToken && client.mobileAuthToken)
    await sendTableReadyRemainderNotification({
      messagingToken: client.messagingToken,
      mobileAuthToken: client.mobileAuthToken,
    })
}

export async function acceptCommensal({
  restaurantSlug,
  client,
}: {
  restaurantSlug: string
  client: CommensalData
}) {
  await kvRemoveCommensal({
    restaurantSlug,
    client,
  })

  await createAnalytics({ restaurantSlug, client, accepted: true })
}

export async function cancelCommensal({
  restaurantSlug,
  restaurantName,
  client,
}: {
  restaurantSlug: string
  restaurantName: string
  client: CommensalData
}) {
  await kvRemoveCommensal({
    restaurantSlug,
    client,
  })

  if (client.timesCalled === 0) {
    await sendReservationCanceledEmail({
      restaurantName,
      client,
      restaurantSlug,
    })
    if (client.messagingToken && client.mobileAuthToken) {
      await sendReservationCanceledNotification({
        messagingToken: client.messagingToken,
        mobileAuthToken: client.mobileAuthToken,
      })
    }
  } else {
    await sendTableCanceledEmail({ restaurantName, client, restaurantSlug })
    if (client.messagingToken && client.mobileAuthToken) {
      await sendTableCanceledNotification({
        messagingToken: client.messagingToken,
        mobileAuthToken: client.mobileAuthToken,
      })
    }
  }

  await createAnalytics({ restaurantSlug, client, accepted: false })
}

export async function removeCommensalFromEmail({
  restaurantSlug,
  client,
}: {
  restaurantSlug: string
  client: CommensalData
}) {
  await kvRemoveCommensal({
    restaurantSlug,
    client,
  })

  await createAnalytics({ restaurantSlug, client, accepted: false })
}

export async function callPickUp({
  restaurantName,
  restaurantSlug,
  order,
}: {
  restaurantName: string
  restaurantSlug: string
  order: PickUpData
}) {
  await kvCallPickUp({ order, restaurantSlug })
  await sendPickUpReadyEmail({ restaurantName, ...order })
}

export async function retryCallPickUp({
  restaurantName,
  order,
}: {
  restaurantName: string
  order: PickUpData
}) {
  await kvRetryCallPickUp({ order })
  await sendPickUpReadyRetryEmail({ restaurantName, ...order })
}

export async function acceptPickUp({
  restaurantSlug,
  order,
}: {
  restaurantSlug: string
  order: PickUpData
}) {
  await kvRemovePickUp({ restaurantSlug, order })
}

export async function cancelPickUp({
  restaurantSlug,
  restaurantName,
  order,
}: {
  restaurantSlug: string
  restaurantName: string
  order: PickUpData
}) {
  await kvRemovePickUp({ restaurantSlug, order })
  await sendPickUpCanceledEmail({ restaurantName, ...order })
}

export async function removeClientFromQueueFromApp({
  email,
  restaurantSlug,
}: {
  email: string
  restaurantSlug: string
}) {
  const client = (await kvGetClientData({ email })) as CommensalData | null

  if (!client) return client

  await kvRemoveCommensal({ restaurantSlug, client })
  const { name } = await getFullRestaurantBySlug(restaurantSlug)

  await sendReservationCanceledFromAppEmail({
    client,
    restaurantSlug,
    restaurantName: name || '',
  })

  await createAnalytics({ restaurantSlug, client, accepted: false })
  return client
}

export async function addClientToQueueFromApp({
  restaurantSlug,
  email,
  ...data
}: { restaurantSlug: string; email: string } & CommensalDataParams) {
  const {
    name,
    groupSize,
    description,
    phoneNumber,
    mobileAuthToken,
    messagingToken,
  } = data

  const { name: restaurantName } = await getFullRestaurantBySlug(restaurantSlug)

  const { response: success, authToken } = await kvAddCommensal({
    restaurantSlug,
    email,
    clientData: {
      name,
      groupSize,
      description: description || '',
      phoneNumber: phoneNumber || '',
      mobileAuthToken,
      messagingToken,
      restaurantSlug,
    },
  })

  if (success)
    await sendAddedToQueueFromAppEmail({
      restaurantName: restaurantName || '',
      email,
      name,
    })

  return { response: success, authToken }
}

export async function addClientToQueue({
  restaurantSlug,
  restaurantName: restaurantNameFromParams,
  email,
  ...data
}: {
  restaurantSlug: string
  restaurantName?: string
  email: string
} & CommensalDataParams) {
  const { name, groupSize, description, phoneNumber } = data
  let restaurantName = restaurantNameFromParams
  if (!restaurantName) {
    const restaurant = await getFullRestaurantBySlug(restaurantSlug)
    restaurantName = restaurant.name || ''
  }

  const { response: success, authToken } = await kvAddCommensal({
    restaurantSlug,
    email,
    clientData: {
      name,
      groupSize,
      description: description || '',
      phoneNumber,
      restaurantSlug,
    },
  })

  if (success) {
    await sendAddedToQueueEmail({
      restaurantName,
      restaurantSlug,
      email,
      name,
      authToken,
    })
  }

  return { response: success, authToken }
}
