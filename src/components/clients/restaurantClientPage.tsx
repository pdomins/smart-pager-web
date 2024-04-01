import React, { useRef, useEffect, useState } from 'react'
import CommensalQueueForm from '../forms/commensalQueueForm'
import PickUpQueueForm from '../forms/pickUpQueueForm'
import { useParams, useRouter } from 'next/navigation'
import { Restaurant } from '@/types/restaurant'
import { getRestaurantBySlug } from '@/repositories/restaurant-respository'
import Loading from '../utils/loading'

export default function RestaurantClientPage() {
  const aboutUsRef = useRef<HTMLDivElement | null>(null)
  const [showQueueForm, setShowQueueForm] = useState(false)
  const [showRetireForm, setShowRetireForm] = useState(false)
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null)
  const router = useRouter()
  const restaurantSlug = useParams<{restaurant: string}>()
  const scrollToElement = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const yOffset = ref.current.offsetTop
      window.scrollTo({ top: yOffset, behavior: 'smooth' })
    }
  }

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

  const toggleQueueFormVisibility = () => {
    setShowQueueForm(!showQueueForm) // Toggle the visibility state
  }

  const toggleRetireFormVisibility = () => {
    setShowRetireForm(!showRetireForm) // Toggle the visibility state
  }

  useEffect(() => {
    // Add an event listener to handle scrolling to the aboutUsRef element
    const handleScrollToAboutUs = () => {
      scrollToElement(aboutUsRef)
    }

    // Attach the event listener to a button or any other trigger
    const scrollButton = document.getElementById('scrollButton')
    if (scrollButton) {
      scrollButton.addEventListener('click', handleScrollToAboutUs)
    }

    return () => {
      // Remove the event listener when the component unmounts
      if (scrollButton) {
        scrollButton.removeEventListener('click', handleScrollToAboutUs)
      }
    }
  }, [aboutUsRef])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
    {restaurantData ? (
      <>
      {showQueueForm && (
        <CommensalQueueForm toggleQueueFormVisibility={toggleQueueFormVisibility} />
      )}
      {showRetireForm && (
        <PickUpQueueForm toggleRetireFormVisibility={toggleRetireFormVisibility} />
      )}
      {!showQueueForm && !showRetireForm && (
        <div className="min-h-screen flex flex-col justify-center relative ">
          <div className="p-4">
            <p className="text-7xl mb-2 text-center">
              <b>{restaurantData?.name}</b>
            </p>

            <div className="flex flex-col">
              <button
                onClick={toggleQueueFormVisibility}
                className="bg-complementary-blue hover:bg-custom-beige text-white font-bold m-3 py-2 px-4 rounded"
              >
                Anotarse para comer
              </button>
              <button
                onClick={toggleRetireFormVisibility}
                className="bg-complementary-blue hover:bg-custom-beige text-white font-bold m-3 py-2 px-4 rounded"
              >
                Retirar pedido
              </button>
              <button
                onClick={() => router.push('/commensal/menu')}
                className="bg-complementary-blue hover:bg-custom-beige text-white font-bold m-3 py-2 px-4 rounded"
              >
                Ver menú
              </button>
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
