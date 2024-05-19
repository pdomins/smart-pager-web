import { getRestaurantBySlug } from '@/repositories/restaurant-respository'
import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const restaurant = await getRestaurantBySlug(params.slug)

  return NextResponse.json(
    { restaurant },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
