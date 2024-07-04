// import { removeClientFromQueueFromApp } from '@/services/queue-service'
import { getRestaurantBySlug } from '@/repositories/restaurant-respository'
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

  // const client = await removeClientFromQueueFromApp({
  //   email,
  //   restaurantSlug: '',
  // })

  // if (!client)
  //   return NextResponse.json(
  //     { msg: `Client ${email} not in queue` },
  //     { status: HTTP_RESPONSE_STATUS.METHOD_NOT_ALLOWED }
  //   )

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

  const restaurant = await getRestaurantBySlug('el-club-de-la-mila-5')

  const positionInQueue = 1

  const client = {
    email,
    positionInQueue,
    waitingTime: positionInQueue * Number(restaurant.avgTimePerTable || 45),
  }

  return NextResponse.json(
    { restaurant, client },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
