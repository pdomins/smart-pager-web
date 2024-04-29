import { CommensalData, PickUpData } from '@/types/queues'
import {
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
  sendPickUpReadyEmail,
  sendTableReadyEmail,
} from '@/repositories/email-repository'

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
  // add metrics logic here
}

export async function retryCallCommensal({
  // restaurantName,
  client,
}: {
  restaurantName: string
  client: CommensalData
}) {
  await kvRetryCallCommensal({ client })
  // send retry email herek
  // add metrics logic here
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

  // add here logic of removed commensals on acceptance (for metrics)
}

export async function cancelCommensal({
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
  // send removal email here

  // add here logic of removed commensals without completion if needed (for metrics)
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

  // metrics logic
}

export async function retryCallPickUp({
  restaurantName,
  order,
}: {
  restaurantName: string
  order: PickUpData
}) {
  await kvRetryCallPickUp({ order })
  await sendPickUpReadyEmail({ restaurantName, ...order })

  // metrics logic
}

export async function acceptPickUp({
  restaurantSlug,
  order,
}: {
  restaurantSlug: string
  order: PickUpData
}) {
  await kvRemovePickUp({ restaurantSlug, order })

  // add here logic of removed pickups on acceptance if needed (for metrics)
}

export async function cancelPickUp({
  restaurantSlug,
  order,
}: {
  restaurantSlug: string
  order: PickUpData
}) {
  await kvRemovePickUp({ restaurantSlug, order })
  // send removal email here

  // add here logic of removed pickups without completion if needed (for metrics)
}
