import { assertAndReturn } from '@/lib/assertions'

const NOTIFICATIONS_URL = assertAndReturn(process.env.NOTIFICATIONS_URL)

export async function sendNotification({
  body,
  title,
  authToken,
  messagingToken,
}: {
  body: string
  title: string
  authToken: string
  messagingToken: string
}) {
  const payload = {
    message: {
      token: messagingToken,
      notification: {
        body,
        title,
      },
    },
  }

  await fetch(NOTIFICATIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  })
}

export async function sendTableReadyNotification({
  restaurantName,
  mobileAuthToken: authToken,
  messagingToken,
}: {
  restaurantName: string
  mobileAuthToken: string
  messagingToken: string
}) {
  return await sendNotification({
    authToken,
    messagingToken,
    title: restaurantName,
    body: 'TABEL READY',
  })
}

export async function sendTableReadyRemainderNotification({
  restaurantName,
  mobileAuthToken: authToken,
  messagingToken,
}: {
  restaurantName: string
  mobileAuthToken: string
  messagingToken: string
}) {
  return await sendNotification({
    authToken,
    messagingToken,
    title: restaurantName,
    body: 'TABLE IS STILL READY',
  })
}

export async function sendTableCanceledNotification({
  restaurantName,
  mobileAuthToken: authToken,
  messagingToken,
}: {
  restaurantName: string
  mobileAuthToken: string
  messagingToken: string
}) {
  return await sendNotification({
    authToken,
    messagingToken,
    title: restaurantName,
    body: 'TABLE CANCELED',
  })
}

export async function sendReservationCanceledNotification({
  restaurantName,
  mobileAuthToken: authToken,
  messagingToken,
}: {
  restaurantName: string
  mobileAuthToken: string
  messagingToken: string
}) {
  return await sendNotification({
    authToken,
    messagingToken,
    title: restaurantName,
    body: 'RESERVATION CANCELED',
  })
}
