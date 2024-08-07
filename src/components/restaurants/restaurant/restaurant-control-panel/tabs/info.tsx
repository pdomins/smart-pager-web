import { RestaurantWithCoordinates } from '@/types/restaurant'
import { Tooltip } from '@mui/material'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Coordinates } from '@/components/maps'
import RestaurantForm, {
  RestaurantFormState,
  WeeklyCalendar,
} from '@/components/restaurants/sign-up/forms/restaurant-form'
import Spinner from '@/components/utils/spinner'
import { FoodType, foodTypes } from '@/lib/food'
import { update } from '@/services/restaurant-service'
import Snackbar from '@/components/utils/snackbar'
import { copyAndCleanCalendar, isValidCalendar } from '@/lib/dates'

const EditButtons = ({
  isEditing,
  isSubmittable,
  resetInitialState,
  setIsEditing,
}: {
  isEditing: boolean
  isSubmittable: boolean
  resetInitialState: () => void
  setIsEditing: Dispatch<SetStateAction<boolean>>
}) => {
  return isEditing ? (
    <>
      <Tooltip
        title={
          isSubmittable
            ? 'Guardar cambios'
            : 'Revisar formato de la información antes de guardar'
        }
        placement="top"
        arrow
      >
        <button
          type="submit"
          key="submit"
          className="relative bg-transparent text-gray-500 hover:text-green-500 font-bold rounded pr-2 mr-2 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-75"
          disabled={!isSubmittable}
        >
          <DoneIcon />
        </button>
      </Tooltip>
      <Tooltip title={'Descartar Cambios'} placement="top" arrow>
        <button
          key="cancel"
          onClick={() => {
            resetInitialState()
            setIsEditing(false) // TODO add dialog: ¿Estas seguro que deseas dejar de editar?"
          }}
          type="button"
          className="relative bg-transparent text-gray-500 hover:text-red-500 font-bold rounded mr-2"
        >
          <CloseIcon />
        </button>
      </Tooltip>
    </>
  ) : (
    <Tooltip title={'Editar perfil'} placement="top" arrow>
      <button
        onClick={() => setIsEditing(true)}
        key="edit"
        type="button"
        className="relative bg-transparent text-gray-500 hover:text-purple-500 font-bold rounded mr-2"
      >
        <EditIcon />
      </button>
    </Tooltip>
  )
}

const RestaurantInfo = ({
  restaurantData,
  setRestaurantData,
}: {
  restaurantData: RestaurantWithCoordinates
  setRestaurantData: Dispatch<SetStateAction<RestaurantWithCoordinates>>
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const initialState = {
    name: restaurantData.name,
    weeklyCalendar: restaurantData.operatingHours as unknown as WeeklyCalendar,
    averageTimePerTable: restaurantData.avgTimePerTable,
    restaurantType: restaurantData.type as FoodType,
    pictureFile: null,
    pictureUrl: restaurantData.picture,
  }

  const resetInitialState = () => {
    setFormState(initialState)
  }

  const [formState, setFormState] = useState<RestaurantFormState>(initialState)
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates>(
    restaurantData.coordinates
  )
  const [address, setAddress] = useState<string | null>(restaurantData.address)

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (isSubmittable && hasChangesToSave()) {
        setIsLoading(true)

        formState.weeklyCalendar = copyAndCleanCalendar(
          formState.weeklyCalendar
        )

        const res = await update({
          id: restaurantData.id,
          coordinates,
          address,
          ...formState,
        })
        setRestaurantData(res)
        setSuccessfullyUpdated(true)
      }
    } finally {
      setIsLoading(false)
      setIsEditing(false)
    }
  }

  const hasChangesToSave = () => {
    return !(
      // necesitamos deep comparison de objetos x eso esta cosa
      (
        JSON.stringify(initialState) === JSON.stringify(formState) &&
        JSON.stringify(restaurantData.coordinates) ===
          JSON.stringify(coordinates) &&
        restaurantData.address === address
      )
    )
  }

  const isSubmittable =
    formState.name &&
    formState.restaurantType &&
    foodTypes.includes(formState.restaurantType as FoodType) &&
    isValidCalendar(formState) &&
    formState.averageTimePerTable &&
    coordinates &&
    address

  return (
    <>
      <Snackbar
        type="success"
        isOpen={successfullyUpdated}
        variant="filled"
        setIsOpen={setSuccessfullyUpdated}
        text="¡Listo! Tus datos se actualizaron con éxito."
      />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6 mt-2">
        <form className="flex flex-col gap-6 relative" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Información del restaurante
            </h2>
            <div className="flex justify-start items-end">
              {isLoading ? (
                <Spinner />
              ) : (
                <EditButtons
                  isEditing={isEditing}
                  isSubmittable={!!isSubmittable}
                  resetInitialState={resetInitialState}
                  setIsEditing={setIsEditing}
                />
              )}
            </div>
          </div>

          <RestaurantForm
            formState={formState}
            setFormState={setFormState}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            showMap={showMap}
            setShowMap={setShowMap}
            address={address}
            setAddress={setAddress}
            disabled={!isEditing}
          />
        </form>
      </div>
    </>
  )
}

export default RestaurantInfo
