import React, { useEffect, useState } from 'react'
import CommensalQueueForm from '../forms/commensalQueueForm'
import { useParams, useRouter } from 'next/navigation'
import { Restaurant } from '@/types/restaurant'
import {
  getFullRestaurantBySlug,
  getRestaurantMenuBySlug,
} from '@/repositories/restaurant-respository'
import Loading from '../utils/loading'
import Gradient from '../style/gradient'
import { daysOfWeek, isRestaurantOpen } from '@/lib/dates'
import { WeeklyCalendar } from '../restaurants/sign-up/forms/restaurant-form'

export default function RestaurantClientPage() {
  const [showCommensalForm, setShowCommensalForm] = useState(false)
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null)
  const router = useRouter()
  const restaurantSlug = useParams<{ restaurant: string }>()

  const [menuUrl, setMenuUrl] = useState<string | null>()

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurant = await getFullRestaurantBySlug(
          restaurantSlug.restaurant
        )
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
    setShowCommensalForm(!showCommensalForm)
  }

  if (!restaurantData) return <Loading />
  const calendar = restaurantData.operatingHours as WeeklyCalendar

  return (
    <div className="flex flex-col min-h-screen">
      <Gradient />
      {!showCommensalForm && (
        <div className="py-5 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Bienvenido a {restaurantData.name}
          </h1>
          <p className="mt-2 text-gray-700">
            Tu experincia gastronómica comienza aquí.
          </p>
        </div>
      )}

      {isRestaurantOpen(calendar) ? (
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          {showCommensalForm && (
            <CommensalQueueForm
              toggleCommensalFormVisibility={toggleCommensalFormVisibility}
            />
          )}
          {!showCommensalForm && (
            <div className="w-full max-w-md">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={toggleCommensalFormVisibility}
                  className="relative w-full bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 rounded rounded-full"
                >
                  Anotarse para Comer
                </button>
                {menuUrl && (
                  <button
                    onClick={viewMenu}
                    className="relative w-full bg-violet-700/10 hover:bg-violet-700/15 text-purple-700 font-bold py-2 rounded rounded-full"
                  >
                    Ver Menú
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-violet-500/10 text-gray-800 p-4 rounded-md shadow">
                <p className="text-lg pb-4 text-center font-semibold">
                  El restaurante se encuentra cerrado, lo sentimos.
                </p>
                <div className="text-center">
                  <p className="font-bold text-xl pb-2">
                    Horarios de Atención:
                  </p>
                  {daysOfWeek.map((day) => {
                    const info = calendar[day]
                    return (
                      <p key={day}>
                        <span className="font-semibold">{day}:</span>{' '}
                        {info.isOpen ? (
                          info.intervals.length > 0 ? (
                            info.intervals.map((interval, index) => (
                              <span key={index} className="text-violet-600">
                                {interval.openingTime} - {interval.closingTime}
                                {index < info.intervals.length - 1 ? ', ' : ''}
                              </span>
                            ))
                          ) : (
                            <span className="text-violet-600">
                              No hay horarios disponibles
                            </span>
                          )
                        ) : (
                          'Cerrado'
                        )}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
