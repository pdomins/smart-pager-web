import { getRestaurants } from '@/repositories/restaurant-respository'
import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page')) || 0
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const search = searchParams.get('search')

  console.log(search) // TODO

  const restaurants = await getRestaurants({ page, pageSize })

  return NextResponse.json(
    { restaurants },
    { status: HTTP_RESPONSE_STATUS.SUCCESS }
  )
}
