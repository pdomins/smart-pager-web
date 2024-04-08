import React, { useEffect, useState } from 'react'
import CommensalQueueForm from '../forms/commensalQueueForm'
import PickUpQueueForm from '../forms/pickUpQueueForm'
import { useParams, useRouter } from 'next/navigation'
import { Restaurant } from '@/types/restaurant'
import {
  getRestaurantBySlug,
  getRestaurantMenuBySlug,
} from '@/repositories/restaurant-respository'
import Loading from '../utils/loading'
import Gradient from '../restaurants/style/gradient'

export default function RestaurantClientPage() {
  const [showCommensalForm, setShowCommensalForm] = useState(false)
  const [showPickUpForm, setShowPickUpForm] = useState(false)
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null)
  const router = useRouter()
  const restaurantSlug = useParams<{ restaurant: string }>()

  const [menuUrl, setMenuUrl] = useState('')

  const viewMenu = async () => {
    window.open(await menuUrl, '_blank')
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurant = await getRestaurantBySlug(restaurantSlug.restaurant)
        if (!restaurant) {
          router.push('/404')
          return
        }
        setRestaurantData(restaurant)
      } catch (error) {
        console.error('Error fetching restaurant data:', error)
      }
    }

    fetchData()
  }, [])

  const toggleCommensalFormVisibility = () => {
    setShowCommensalForm(!showCommensalForm) // Toggle the visibility state
  }

  const togglePickUpFormVisibility = () => {
    setShowPickUpForm(!showPickUpForm) // Toggle the visibility state
  }

  if (!restaurantData) return <Loading />

  return (
    <div className="flex flex-col min-h-screen">
      <Gradient />
      {!showPickUpForm && !showCommensalForm && (
        <div className="py-5 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Bienvenido a {restaurantData?.name}
          </h1>
          <p className="mt-2 text-gray-700">
            Tu experincia gastronómica comienza aquí.
          </p>
        </div>
      )}

      <div className="flex-grow flex flex-col items-center justify-center px-4">
        {showCommensalForm && (
          <CommensalQueueForm
            toggleCommensalFormVisibility={toggleCommensalFormVisibility}
          />
        )}
        {showPickUpForm && (
          <PickUpQueueForm
            togglePickUpFormVisibility={togglePickUpFormVisibility}
          />
        )}
        {!showPickUpForm && !showCommensalForm && (
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={toggleCommensalFormVisibility}
                className="relative w-full bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 rounded rounded-full"
              >
                Anotarse para Comer
              </button>
              <button
                onClick={togglePickUpFormVisibility}
                className="relative w-full bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 rounded rounded-full"
              >
                Retirar pedido
              </button>
              {menuUrl && (
                <button
                  onClick={viewMenu}
                  className="relative w-full bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 rounded rounded-full"
                >
                  Ver Menú
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
