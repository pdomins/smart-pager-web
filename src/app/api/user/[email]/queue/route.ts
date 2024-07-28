// import { removeClientFromQueueFromApp } from '@/services/queue-service'
import { getClientData } from '@/repositories/queue-repository'
import { getRestaurantBySlug } from '@/repositories/restaurant-respository'
import { removeClientFromQueueFromApp } from '@/services/queue-service'
import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextRequest, NextResponse } from 'next/server'

/**
 * DELETE /api/user/[email]/queue
 *
 * Path Parameters:
 *  - email (string): The client's email address.
 *
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params

  const clientData = await getClientData({ email })

  if (!clientData)
    return NextResponse.json(
      { msg: `Client ${email} not in queue` },
      { status: HTTP_RESPONSE_STATUS.METHOD_NOT_ALLOWED }
    )

  const client = await removeClientFromQueueFromApp({
    email,
    restaurantSlug: clientData.restaurantSlug,
  })

  if (!client)
    return NextResponse.json(
      { msg: `Client ${email} not in queue` },
      { status: HTTP_RESPONSE_STATUS.METHOD_NOT_ALLOWED }
    )

  return NextResponse.json(
    { msg: `Successfully removed ${email} from queue` },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}

/**
 * GET /api/user/[email]/queue
 *
 * Path Parameters:
 *  - email (string): The client's email address.
 *
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params

  const clientData = await getClientData({ email })

  if (!clientData) {
    return NextResponse.json({ status: HTTP_RESPONSE_STATUS.NO_CONTENT })
  }

  const restaurant = await getRestaurantBySlug(clientData.restaurantSlug)

  const timeInQueue =
    (new Date().getTime() - clientData.joinedAt.getTime()) / 60000 // 60000 milliseconds in a minute

  const waitingTime = Math.max(
    Number(restaurant.avgTimePerTable || 45) - timeInQueue,
    0
  )

  const client = {
    email,
    waitingTime,
    isCalled: clientData.timesCalled > 0 ? true : false,
  }

  return NextResponse.json(
    { restaurant, client },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
