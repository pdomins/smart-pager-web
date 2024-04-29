import { ContactUsHTML } from '@/lib/emails'
import {
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
} from '@/lib/emails/queue'
import { CommensalData, PickUpData } from '@/types/queues'

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
