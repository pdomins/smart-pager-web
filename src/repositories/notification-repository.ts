import { assertAndReturn } from '@/lib/assertions'

const NOTIFICATIONS_URL = assertAndReturn(
  process.env.NEXT_PUBLIC_NOTIFICATIONS_URL
)

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
  mobileAuthToken: authToken,
  messagingToken,
}: {
  mobileAuthToken: string
  messagingToken: string
}) {
  return await sendNotification({
    authToken,
    messagingToken,
    title: `Tu mesa está lista!`,
    body: 'Acercate a la recepción para ser ubicado.',
  })
}

export async function sendTableReadyRemainderNotification({
  mobileAuthToken: authToken,
  messagingToken,
}: {
  mobileAuthToken: string
  messagingToken: string
}) {
  return await sendNotification({
    authToken,
    messagingToken,
    title: `Tu mesa te espera`,
    body: 'Acercate a la recepción para ser atendido antes de que se libere tu reserva.',
  })
}

export async function sendTableCanceledNotification({
  mobileAuthToken: authToken,
  messagingToken,
}: {
  mobileAuthToken: string
  messagingToken: string
}) {
  return await sendNotification({
    authToken,
    messagingToken,
    title: `Tu mesa fue cancelada`,
    body: 'Te esperamos mucho tiempo pero no apareciste! :( Esperamos verte pronto!.',
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
    title: `Reserva cancelada en ${restaurantName}`,
    body: 'Se canceló tu reserva. Esperamos que puedas visitarnos en otra ocasión.',
  })
}
