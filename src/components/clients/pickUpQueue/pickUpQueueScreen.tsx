import React, { useEffect, useState } from 'react'
import { getRestaurantMenuBySlug } from '@/repositories/restaurant-respository'
import { useParams } from 'next/navigation'
import Gradient from '@/components/style/gradient'
export default function PickUpQueueScreen() {
  const [menuUrl, setMenuUrl] = useState<string | null>()
  const restaurantSlug = useParams<{ restaurant: string }>()

  const viewMenu = async () => {
    if (menuUrl) window.open(menuUrl, '_blank')
  }

  useEffect(() => {
    const fetchMenuUrl = async () => {
      try {
        const menuUrl = await getRestaurantMenuBySlug(restaurantSlug.restaurant)
        setMenuUrl(menuUrl)
      } catch (error) {
        console.error('Error setting menu URL:', error)
      }
    }
    fetchMenuUrl()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Gradient />
      <div className="flex min-h-screen">
        <div className="text-center mx-auto px-4 sm:px-6 lg:px-8 items-center content-center">
          <h1 className="mt-5 font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900">
            ¡Listo!
          </h1>
          <p className="mt-4 md:text-lg lg:text-xl text-gray-700 italic">
            Le enviaremos un mensaje por whatsapp cuando su pedido este listo.
            Si desea desanotarse, verifique su email.
          </p>
          {menuUrl && (
            <button
              type="button"
              className="relative mt-6 w-full bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 rounded rounded-full"
              onClick={viewMenu}
            >
              Ver menú
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
