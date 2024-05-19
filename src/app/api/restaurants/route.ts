import { searchRestaurants } from '@/services/restaurant-service'
import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page')) || 0
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const search = searchParams.get('search') || undefined

  const restaurants = await searchRestaurants({ page, pageSize, search })

  return NextResponse.json(
    { restaurants },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
