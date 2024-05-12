import { pattern } from '@/lib/phone'
import { validateSchema } from '@/lib/validator'
import { addCommensal } from '@/services/kv/commensal-queue-service'
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
 *
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
    },
  } = data

  await addCommensal({
    restaurantSlug,
    email,
    clientData: {
      name,
      groupSize: commensals,
      description: description || '',
      phoneNumber,
    },
  })

  return NextResponse.json(
    { msg: 'Successfully added to queue' },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
export async function DELETE() {}
