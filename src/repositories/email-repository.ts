import {
  AddedToQueueHTML,
  ContactUsHTML,
  PickUpReadyHTML,
  TableReadyHTML,
} from '@/lib/emails'
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
  await fetch(`/api/emails/send`, {
    method: 'POST',
    body: JSON.stringify({
      recipient,
      subject,
      html,
    }),
  })
}

export async function sendTableReadyEmail({
  restaurantName,
  ...otherAttrs
}: CommensalData & { restaurantName: string }) {
  const { name, email } = otherAttrs

  await sendEmail({
    recipient: email,
    subject: '¡Tu mesa está lista!',
    html: TableReadyHTML({ name, restaurantName }),
  })
}

export async function sendPickUpReadyEmail({
  restaurantName,
  ...otherAttrs
}: PickUpData & { restaurantName: string }) {
  const { name, email } = otherAttrs

  await sendEmail({
    recipient: email,
    subject: '¡Tu pedido está listo!',
    html: PickUpReadyHTML({
      name,
      restaurantName,
      orderNumber: otherAttrs.pickupId,
    }),
  })
}

export async function sendAddedToQueueEmail({
  restaurantName,
  ...otherAttrs
}: CommensalData & { restaurantName: string }) {
  const { name, email } = otherAttrs

  await sendEmail({
    recipient: email,
    subject: '¡Te encontrás en la lista de espera!',
    html: AddedToQueueHTML({ name, restaurantName }),
  })
}

export async function sendContactUsEmail({
  email,
  message,
}: {
  email: string
  message: string
}) {
  await sendEmail({
    recipient: 'smartpager.pf@gmail.com',
    subject: `INTERNO - Nuevo Cliente: ${email} `,
    html: ContactUsHTML({ email, message }),
  })
}
