import { assertAndReturn } from '@/lib/assertions'
import { ContactUsHTML, NewRestaurantHTML } from '@/lib/emails'
import {
  PickUpAddedHTML,
  PickUpCanceledHTML,
  PickUpReadyHTML,
  PickUpReadyRetryHTML,
} from '@/lib/emails/pick-up'
import {
  TableReadyHTML,
  TableReadyRemainderHTML,
  AddedToQueueHTML,
  TableCanceledHTML,
  ReservationCanceledHTML,
  ReservationCanceledFromAppHTML,
  AddedToQueueFromAppHTML,
} from '@/lib/emails/queue'
import { CommensalData, PickUpData } from '@/types/queues'

const BASE_URL = assertAndReturn(process.env.NEXT_PUBLIC_BASE_URL)

async function sendEmail({
  recipient,
  subject,
  html,
}: {
  recipient: string
  subject: string
  html: string
}) {
  return await fetch(`/api/emails/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipient,
      subject,
      html,
    }),
  })
}

async function sendEmailFromEndpoint({
  recipient,
  subject,
  html,
}: {
  recipient: string
  subject: string
  html: string
}) {
  return await fetch(`${BASE_URL}/api/emails/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipient,
      subject,
      html,
    }),
  })
}
export async function sendContactUsEmail({
  email,
  message,
}: {
  email: string
  message: string
}) {
  return await sendEmail({
    recipient: 'smartpager.pf@gmail.com',
    subject: `EXTERNO - Nuevo Cliente: ${email} `,
    html: ContactUsHTML({ email, message }),
  })
}

export async function sendNewRestaurantEmail({
  email,
  name,
  id,
}: {
  id: number
  email: string
  name: string
}) {
  return await sendEmail({
    recipient: 'smartpager.pf@gmail.com',
    subject: `EXTERNO - Nuevo Restaurante Registrado: ${email} `,
    html: NewRestaurantHTML({ email, name, id }),
  })
}

export async function sendTableReadyEmail({
  restaurantName,
  ...otherAttrs
}: CommensalData & { restaurantName: string }) {
  const { name, email } = otherAttrs

  return await sendEmail({
    recipient: email,
    subject: '¡Tu mesa esta lista!',
    html: TableReadyHTML({ name, restaurantName }),
  })
}

export async function sendTableReadyRemainderEmail({
  restaurantName,
  ...otherAttrs
}: CommensalData & { restaurantName: string }) {
  const { name, email } = otherAttrs

  return await sendEmail({
    recipient: email,
    subject: '¡Tu mesa te esta esperando!',
    html: TableReadyRemainderHTML({ name, restaurantName }),
  })
}

export async function sendAddedToQueueEmail({
  ...params
}: {
  restaurantName: string
  restaurantSlug: string
  name: string
  email: string
  authToken: string
}) {
  return await sendEmail({
    recipient: params.email,
    subject: '¡Te encontras en la lista de espera!',
    html: AddedToQueueHTML({ ...params }),
  })
}

export async function sendTableCanceledEmail({
  client,
  restaurantName,
  restaurantSlug,
}: {
  client: CommensalData
  restaurantName: string
  restaurantSlug: string
}) {
  const { email, name } = client
  return await sendEmail({
    recipient: email,
    subject: `Tu reserva fue cancelada`,
    html: TableCanceledHTML({ name, restaurantName, restaurantSlug }),
  })
}

export async function sendReservationCanceledEmail({
  client,
  restaurantName,
  restaurantSlug,
}: {
  client: CommensalData
  restaurantName: string
  restaurantSlug: string
}) {
  const { email, name } = client
  return await sendEmail({
    recipient: email,
    subject: `Tu reserva fue cancelada`,
    html: ReservationCanceledHTML({ name, restaurantName, restaurantSlug }),
  })
}

export async function sendReservationCanceledFromAppEmail({
  client,
  restaurantName,
  restaurantSlug,
}: {
  client: CommensalData
  restaurantName: string
  restaurantSlug: string
}) {
  const { email, name } = client
  return await sendEmailFromEndpoint({
    recipient: email,
    subject: `¡Te desanotaste de la lista!`,
    html: ReservationCanceledFromAppHTML({
      name,
      restaurantName,
      restaurantSlug,
    }),
  })
}

export async function sendAddedToQueueFromAppEmail({
  ...params
}: {
  restaurantName: string
  name: string
  email: string
}) {
  return await sendEmailFromEndpoint({
    recipient: params.email,
    subject: '¡Te encontras en la lista de espera!',
    html: AddedToQueueFromAppHTML({ ...params }),
  })
}

export async function sendPickUpAddedEmail({
  restaurantName,
  name,
  email,
  orderNumber,
}: {
  restaurantName: string
  name: string
  email: string
  orderNumber: string
}) {
  await sendEmail({
    recipient: email,
    subject: '¡Tu pedido está siendo preparado!',
    html: PickUpAddedHTML({
      name,
      restaurantName,
      orderNumber,
    }),
  })
}

export async function sendPickUpReadyEmail({
  restaurantName,
  ...otherAttrs
}: PickUpData & { restaurantName: string }) {
  const { name, email } = otherAttrs

  await sendEmail({
    recipient: email,
    subject: '¡Tu pedido esta listo!',
    html: PickUpReadyHTML({
      name,
      restaurantName,
      orderNumber: otherAttrs.pickUpId,
    }),
  })
}

export async function sendPickUpReadyRetryEmail({
  restaurantName,
  ...otherAttrs
}: PickUpData & { restaurantName: string }) {
  const { name, email } = otherAttrs

  await sendEmail({
    recipient: email,
    subject: '¡Tu pedido te esta esperando!',
    html: PickUpReadyRetryHTML({
      name,
      restaurantName,
      orderNumber: otherAttrs.pickUpId,
    }),
  })
}

export async function sendPickUpCanceledEmail({
  restaurantName,
  ...otherAttrs
}: PickUpData & { restaurantName: string }) {
  const { name, email } = otherAttrs

  await sendEmail({
    recipient: email,
    subject: 'Tu pedido fue cancelado',
    html: PickUpCanceledHTML({
      name,
      restaurantName,
      orderNumber: otherAttrs.pickUpId,
    }),
  })
}
