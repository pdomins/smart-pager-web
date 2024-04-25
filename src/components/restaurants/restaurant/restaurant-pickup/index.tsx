'use client'

import { Restaurant } from '@/types/restaurant'
import Gradient from '../../../style/gradient'
import Container from '../../../style/container'
import { useEffect } from 'react'
import { assertAndReturn } from '@/lib/assertions'
import Loading from '@/components/utils/loading'

export default function RestaurantPickUp({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  if (!restaurantData.slug) {
    return <Loading />
  }
  const restaurantSlug = assertAndReturn(restaurantData.slug)
  useEffect(() => {
    console.log(restaurantSlug)
  }, [restaurantSlug])

  return (
    <div className="relative" id="pickup">
      {/* here will be the dialog to add a new order */}
      <Gradient />
      <Container>
        <div className="text-center pt-20 pb-10">
          <h1 className="font-bold text-4xl md:text-5xl">
            Lista de <span className="text-purple-800">Retiro</span>
          </h1>
          <p className="mt-4 text-gray-700">
            Organizá las órdenes de los clientes listas para ser retiradas.
          </p>
        </div>
      </Container>
    </div>
  )
}
