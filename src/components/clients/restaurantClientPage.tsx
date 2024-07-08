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
import Image from 'next/image'
import Placeholder from 'public/placeholder.svg'
import MenuPage from './menuPage'

export default function RestaurantClientPage() {
  const [showCommensalForm, setShowCommensalForm] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null)
  const router = useRouter()
  const restaurantSlug = useParams<{ restaurant: string }>()

  const [menuUrl, setMenuUrl] = useState<string | null>()

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
    setShowMenu(false)
  }

  const toggleMenuPageVisibility = () => {
    setShowCommensalForm(false)
    setShowMenu(!showMenu)
  }

  if (!restaurantData) return <Loading />
  const calendar = restaurantData.operatingHours as WeeklyCalendar

  const showMainPage = !showCommensalForm && !showMenu

  return (
    <div className="flex flex-col min-h-screen">
      <Gradient />
      {showMainPage && (
        <div className="py-5 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              <Image
                src={restaurantData.picture || Placeholder.src}
                alt="Profile Picture"
                unoptimized={true}
                width={75}
                height={75}
                loading="lazy"
                className="rounded-full"
              />

              <h1 className="text-3xl md:text-4xl font-bold ml-0 lg:ml-4">
                Bienvenido a {restaurantData.name}
              </h1>
            </div>

            <p className="mt-2 text-gray-700">
              Tu experiencia gastronómica empieza acá.
            </p>
          </div>
        </div>
      )}

      {isRestaurantOpen(calendar) ? (
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          {showMenu && (
            <MenuPage
              menuUrl={menuUrl || ''}
              toggleMenuPageVisibility={toggleMenuPageVisibility}
            />
          )}
          {showCommensalForm && (
            <CommensalQueueForm
              toggleCommensalFormVisibility={toggleCommensalFormVisibility}
            />
          )}
          {showMainPage && (
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
                    onClick={toggleMenuPageVisibility}
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
