import React, { FormEvent, useState } from 'react'
import Gradient from '@/components/style/gradient'
import Container from '@/components/style/container'
import { Coordinates } from '../../maps'
import Spinner from '../../utils/spinner'
import { Restaurant } from '@/types/restaurant'
import RestaurantForm, { RestaurantFormState } from './forms/restaurant-form'
import { copyAndCleanCalendar, defaultWeek, isValidCalendar } from '@/lib/dates'
import { update } from '@/services/restaurant-service'
import { foodTypes, FoodType } from '@/lib/food'
import { sendNewRestaurantEmail } from '@/repositories/email-repository'
import { useRouter } from 'next/navigation'
import Snackbar from '@/components/utils/snackbar'


export default function RestaurantSignUp({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const router = useRouter()

  const initialState = {
    name: null,
    weeklyCalendar: defaultWeek(),
    averageTimePerTable: null,
    selectedFile: null,
    restaurantType: null,
    pictureFile: null,
    pictureUrl: null,
  }

  const [formState, setFormState] = useState<RestaurantFormState>(initialState)
  const [showMap, setShowMap] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (isSubmittable) {
        setIsLoading(true)

        formState.weeklyCalendar = copyAndCleanCalendar(
          formState.weeklyCalendar
        )

        await update({
          id: restaurantData.id,
          coordinates,
          address,
          ...formState,
        })

        await sendNewRestaurantEmail({
          id: restaurantData.id,
          email: restaurantData.email,
          name: formState.name || '',
        })

        router.push('/management/sign-up/success')
      }
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const isSubmittable =
    formState.name &&
    formState.restaurantType &&
    foodTypes.includes(formState.restaurantType as FoodType) &&
    isValidCalendar(formState) &&
    formState.averageTimePerTable &&
    coordinates &&
    formState.pictureUrl &&
    address

  return (
    <>  <Snackbar
    type="error"
    isOpen={hasError}
    variant="filled"
    setIsOpen={setHasError}
    text="Error al cargar los datos, por favor intente nuevamente."
  />
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
                address={address}
                setAddress={setAddress}
              />

              {isLoading ? (
                <div className="flex justify-center">
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
    </>
  )
}
