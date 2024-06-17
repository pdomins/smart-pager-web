import { fetchRestaurantCategories } from '@/services/restaurant-service'
import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const categories = fetchRestaurantCategories()

  return NextResponse.json(
    { categories },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
