import React, { FormEvent, useEffect, useState } from 'react'
import Container from '../style/container'
import Gradient from '../style/gradient'
// import { useRouter } from 'next/navigation'
import GoogleMaps, { Coordinates } from '../maps'
import PlacesAutocomplete from '../maps/autocomplete'
// import { updateRestaurantDetails } from '@/repositories/restaurant-respository'
import Spinner from '../utils/spinner'
import { Restaurant } from '@/types/restaurant'

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

  const toggleMap = () => {
    setShowMap(!showMap)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file && file.name.toLowerCase().endsWith('.pdf')) {
      setSelectedFile(file)
    } else {
      alert('El archivo debe estar en formato PDF.')
      setSelectedFile(null)
    }
  }

  const validateTimes = ({
    opening,
    closing,
  }: {
    opening: string | null
    closing: string | null
  }) => {
    if (opening && closing) {
      setIsTimeError(opening >= closing)
    } else {
      setIsTimeError(false)
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
              <label className="block">
                <span className="text-gray-700">
                  Nombre del restaurante:{' '}
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                  placeholder="Ingresa el nombre del restaurante"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">
                  Ubicación: <span className="text-red-500">*</span>
                </span>
                <div
                  className={`${
                    showMap && 'mb-6'
                  } flex items-center space-x-4 mt-1`}
                >
                  <PlacesAutocomplete
                    setCoordinates={setCoordinates}
                    isRequired={true}
                  />
                  <button
                    onClick={toggleMap}
                    type="button"
                    className="bg-violet-700 w-1/3 text-white px-4 py-2 rounded-full transition-colors hover:bg-violet-800"
                  >
                    {showMap ? 'Ocultar Mapa' : 'Ver Mapa'}
                  </button>
                </div>
                {showMap && <GoogleMaps coordinates={coordinates} />}
              </label>
              <div className="flex gap-4 items-center">
                <label className="block flex-1">
                  <span className="text-gray-700">
                    Horario de apertura: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="time"
                    className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                    value={openingTime || ''}
                    onChange={(e) => {
                      setOpeningTime(e.target.value)
                      validateTimes({
                        opening: e.target.value,
                        closing: closingTime,
                      })
                    }}
                    required
                  />
                </label>
                <label className="block flex-1">
                  <span className="text-gray-700">
                    Horario de cierre: <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="time"
                    className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                    value={closingTime || ''}
                    required
                    onChange={(e) => {
                      setClosingTime(e.target.value)
                      validateTimes({
                        opening: openingTime,
                        closing: e.target.value,
                      })
                    }}
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-gray-700">
                  Tiempo promedio por mesa (en minutos):{' '}
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="number"
                  className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                  placeholder="Ejemplo: 45"
                  value={averageTimePerTable || ''}
                  onChange={(e) => setAverageTimePerTable(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">
                  Cargar menú: <span className="text-red-500">*</span>
                </span>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf"
                  className="form-input bg-white text-gray-400 mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                  onChange={handleFileChange}
                  required
                />
              </label>
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
