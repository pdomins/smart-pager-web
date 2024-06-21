import { FoodType, foodTypes } from '@/lib/food'
import { searchRestaurants } from '@/services/restaurant-service'
import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextRequest, NextResponse } from 'next/server'

function getCategory(category: string | null): string | undefined {
  if (category && (foodTypes as readonly string[]).includes(category)) {
    return category as FoodType
  } else {
    return undefined
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page')) || 0
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const search = searchParams.get('search') || undefined
  const category = getCategory(searchParams.get('category')) as
    | FoodType
    | undefined
  const distance = Number(searchParams.get('distance')) || undefined
  const longitude = Number(searchParams.get('longitude')) || undefined
  const latitude = Number(searchParams.get('latitude')) || undefined

  const restaurants = await searchRestaurants({
    page,
    pageSize,
    search,
    category,
    distance,
    latitude,
    longitude,
  })

  return NextResponse.json(
    { restaurants },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
