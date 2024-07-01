import { pattern } from '@/lib/phone'
import { validateSchema } from '@/lib/validator'
import {
  addClientToQueueFromApp,
  removeClientFromQueueFromApp,
} from '@/services/queue-service'
import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextRequest, NextResponse } from 'next/server'
import * as yup from 'yup'

const schema = yup.object().shape({
  client: yup.object().shape({
    email: yup.string().required(),
    name: yup.string().required(),
    commensalsAmount: yup.string().required(),
    phoneNumber: yup.string().required().matches(pattern),
    description: yup.string().optional(),
    authToken: yup.string().required(),
    messagingToken: yup.string().required(),
  }),
})

const deleteSchema = yup.object().shape({
  client: yup.object().shape({
    email: yup.string().required(),
  }),
})

/**
 * POST /api/restaurants/[slug]/queue
 *
 * Path Parameters:
 *  - slug (string): The unique identifier for the restaurant.
 *
 * Payload Parameters:
 *  - client (object): Contains the necessary details about the client making the reservation.
 *    - email (string): The client's email address, which must be a valid email format.
 *    - name (string): The client's full name.
 *    - commensalsAmount (string): The total number of diners included in the reservation.
 *    - phoneNumber (string): The client's contact phone number.
 *    - description (string, optional): Any additional information about the reservation that the client wishes to provide.
 *    - authToken (string): Auth token needed to send notifications
 *    - messagingToken (string): Mobile id
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug: restaurantSlug } = params

  const { data, res } = await validateSchema({ schema, req })

  if (!data) return res

  const {
    client: {
      email,
      name,
      commensalsAmount: commensals,
      description,
      phoneNumber,
      authToken,
      messagingToken,
    },
  } = data

  try {
    const { response } = await addClientToQueueFromApp({
      restaurantSlug,
      email,
      groupSize: commensals,
      description: description || '',
      name,
      phoneNumber,
      mobileAuthToken: authToken,
      messagingToken,
    })

    if (!response) {
      return NextResponse.json(
        { msg: 'Client already in queue' },
        { status: HTTP_RESPONSE_STATUS.METHOD_NOT_ALLOWED }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { msg: `Something unexpected happened, ${error}` },
      { status: HTTP_RESPONSE_STATUS.SERVICE_UNAVAILABLE }
    )
  }

  return NextResponse.json(
    { msg: 'Successfully added to queue' },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}

/**
 * DELETE /api/restaurants/[slug]/queue
 *
 * Path Parameters:
 *  - slug (string): The unique identifier for the restaurant.
 *
 * Payload Parameters:
 *  - client (object): Contains the necessary details about the client making the reservation.
 *    - email (string): The client's email address, which must be a valid email format.
 *
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug: restaurantSlug } = params

  const { data, res } = await validateSchema({ schema: deleteSchema, req })

  if (!data) return res

  const client = await removeClientFromQueueFromApp({
    email: data.client.email,
    restaurantSlug,
  })

  if (!client)
    return NextResponse.json(
      { msg: 'Client not in queue' },
      { status: HTTP_RESPONSE_STATUS.METHOD_NOT_ALLOWED }
    )

  return NextResponse.json(
    { msg: 'Successfully removed from queue' },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
