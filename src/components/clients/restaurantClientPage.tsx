import React, { useEffect, useState } from 'react'
import CommensalQueueForm from '../forms/commensalQueueForm'
import PickUpQueueForm from '../forms/pickUpQueueForm'
import { useParams, useRouter } from 'next/navigation'
import { Restaurant } from '@/types/restaurant'
import { getRestaurantBySlug, getRestaurantMenuBySlug } from '@/repositories/restaurant-respository'
import Loading from '../utils/loading'

export default function RestaurantClientPage() {
  const [showCommensalForm, setShowCommensalForm] = useState(false)
  const [showPickUpForm, setShowPickUpForm] = useState(false)
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null)
  const router = useRouter()
  const restaurantSlug = useParams<{restaurant: string}>()

  const [menuUrl, setMenuUrl] = useState('');


  const viewMenu = async () => {
    window.open(await menuUrl, '_blank');
  }

  useEffect(() => {
    const fetchMenuUrl = async () => {
      try {
        const menuUrl = await getRestaurantMenuBySlug(restaurantSlug.restaurant);
        setMenuUrl(menuUrl);
      } catch (error) {
        console.error('Error setting menu URL:', error);
      }
    };

    fetchMenuUrl();
  }, []);

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

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
    {restaurantData ? (
      <>
      {showCommensalForm && (
        <CommensalQueueForm toggleCommensalFormVisibility={toggleCommensalFormVisibility} />
      )}
      {showPickUpForm && (
        <PickUpQueueForm togglePickUpFormVisibility={togglePickUpFormVisibility} />
      )}
      {!showPickUpForm && !showCommensalForm && (
        <div className="min-h-screen flex flex-col justify-center relative ">
          <div className="p-4">
            <p className="text-7xl mb-2 text-center">
              <b>{restaurantData?.name}</b>
            </p>

            <div className="flex flex-col">
              <button
                onClick={toggleCommensalFormVisibility}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
              >
                Anotarse para comer
              </button>
              <button
                onClick={togglePickUpFormVisibility}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
              >
                Retirar pedido
              </button>

              { menuUrl && (
              <button 
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
              onClick={viewMenu}>
                Ver menú
              </button>
              )}
            </div>
          </div>
        </div>
      )}
      </>
      ) : 
      <Loading />
      }
    </>
  )
}
