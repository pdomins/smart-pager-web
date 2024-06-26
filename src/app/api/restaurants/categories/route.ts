import { fetchRestaurantCategories } from '@/services/restaurant-service'
import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextResponse } from 'next/server'

export async function GET() {
  const categories = fetchRestaurantCategories()

  return NextResponse.json(
    { categories },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
