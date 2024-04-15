import React, { FormEvent, useState } from 'react'
import Container from '../../style/container'
import Gradient from '../../style/gradient'
// import { useRouter } from 'next/navigation'
import { Coordinates } from '../../maps'
// import { updateRestaurantDetails } from '@/repositories/restaurant-respository'
import Spinner from '../../utils/spinner'
import { Restaurant } from '@/types/restaurant'
import RestaurantForm, { FormState } from './forms/restaurant-form'

export default function RestaurantSignUp({
  restaurantData,
}: {
  restaurantData: Restaurant | null
}) {
  const initialState = {
    name: null,
    openingTime: null,
    closingTime: null,
    isTimeError: false,
    averageTimePerTable: null,
    selectedFile: null,
  }

  const [formState, setFormState] = useState<FormState>(initialState)
  // const router = useRouter()
  const [showMap, setShowMap] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (isSubmittable) {
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
        //   menu: 'reestableceme-el-blob-vercel.pdf', (menuURL)
        // })
        console.log({
          msg: 'Updated values',
          name: formState.name,
          openingTime: formState.openingTime,
          closingTime: formState.closingTime,
          averageTimePerTable: formState.averageTimePerTable,
          coordinates,
          selectedFile: formState.selectedFile,
          address,
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
    formState.name &&
    formState.openingTime &&
    formState.closingTime &&
    !formState.isTimeError &&
    formState.averageTimePerTable &&
    // coordinates &&
    formState.selectedFile &&
    address

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
              <RestaurantForm
                formState={formState}
                setFormState={setFormState}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                showMap={showMap}
                setShowMap={setShowMap}
                setAddress={setAddress}
              />

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
