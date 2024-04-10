import React, { FormEvent, useEffect, useState } from 'react'
import Container from '../../style/container'
import Gradient from '../../style/gradient'
// import { useRouter } from 'next/navigation'
import { Coordinates } from '../../maps'
// import { updateRestaurantDetails } from '@/repositories/restaurant-respository'
import Spinner from '../../utils/spinner'
import { Restaurant } from '@/types/restaurant'
import RestaurantNameForm from './forms/restaurant-name-form'
import RestaurantLocationForm from './forms/restaurant-location-form'
import RestaurantOpeningAndClosingTimesForm from './forms/restaurant-opening-and-closing-times-form'
import RestaurantAverageTimePerTableForm from './forms/restaurant-average-time-per-table-form'
import RestaurantMenuForm from './forms/restaurant-menu-form'

export default function RestaurantSignUp({
  restaurantData,
}: {
  restaurantData: Restaurant | null
}) {
  // const router = useRouter()
  const [showMap, setShowMap] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates>(null)
  const [name, setName] = useState<string | null>(null)
  const [openingTime, setOpeningTime] = useState<string | null>(null)
  const [closingTime, setClosingTime] = useState<string | null>(null)
  const [isTimeError, setIsTimeError] = useState(false)
  const [averageTimePerTable, setAverageTimePerTable] = useState<string | null>(
    null
  )
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.defer = true
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places&callback=loadSuggestions`
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (
        name &&
        openingTime &&
        closingTime &&
        !isTimeError &&
        averageTimePerTable &&
        // coordinates &&
        selectedFile
      ) {
        setIsLoading(true)
        console.log(restaurantData)
        /** TODO wait for vercel blob storage be available again
        
        const response = await fetch(`/api/restaurants/upload?filename=${restaurantData?.id}`, {
          method: 'POST',
          body: selectedFile,
        })

        const responseData = await response.json()
        const menuURL = responseData.url
        */

        // await updateRestaurantDetails({
        //   id: 1,
        //   name,
        //   menuURL: 'reestableceme-el-blob-vercel.pdf',
        // })
        console.log({
          msg: 'Updated values',
          name,
          openingTime,
          closingTime,
          averageTimePerTable,
          coordinates,
          selectedFile,
        })

        // router.push('/management')
      } else {
        alert('Por favor, complete todos los campos requeridos')
      }
    } catch (error) {
      alert('Error al cargar los datos, por favor intente nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const isSubmittable =
    name &&
    openingTime &&
    closingTime &&
    !isTimeError &&
    averageTimePerTable &&
    // coordinates &&
    selectedFile

  return (
    <div className="relative" id="signup">
      <Gradient />
      <Container>
        <div className="relative pt-36 pb-20 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl">
              Completa tu perfil en{' '}
              <span className="text-purple-800">Smart Pager</span>
            </h1>
            <p className="mt-8 text-gray-700">
              Te pedimos algunos detalles adicionales para poder brindar la
              mejor atención posible, tanto a vos como a tus clientes.
            </p>
          </div>
          <div className="mt-10 md:mt-16 lg:w-1/2 lg:mx-auto">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <RestaurantNameForm name={name || ''} setName={setName} />
              <RestaurantLocationForm
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                showMap={showMap}
                setShowMap={setShowMap}
              />
              <RestaurantOpeningAndClosingTimesForm
                openingTime={openingTime || ''}
                setOpeningTime={setOpeningTime}
                closingTime={closingTime || ''}
                setClosingTime={setClosingTime}
                setIsTimeError={setIsTimeError}
              />
              <RestaurantAverageTimePerTableForm
                averageTimePerTable={averageTimePerTable || ''}
                setAverageTimePerTable={setAverageTimePerTable}
              />
              <RestaurantMenuForm setSelectedFile={setSelectedFile} />

              {isLoading ? (
                <div className="mt-4 px-6 py-2">
                  <Spinner />
                </div>
              ) : (
                <button
                  type="submit"
                  className="mt-4 px-6 py-2 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-800 transition-colors disabled:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-75"
                  disabled={!isSubmittable}
                >
                  Finalizar Registro
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}
