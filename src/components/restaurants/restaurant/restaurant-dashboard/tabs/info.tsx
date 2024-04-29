import { Restaurant } from '@/types/restaurant'
import { Tooltip } from '@mui/material'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Coordinates } from '@/components/maps'
import RestaurantForm, {
  FormState,
} from '@/components/restaurants/sign-up/forms/restaurant-form'
import { updateRestaurantDetails } from '@/repositories/restaurant-respository'
import Spinner from '@/components/utils/spinner'
import { defaultWeek } from '@/lib/dates'

const EditButtons = ({
  isEditing,
  resetInitialState,
  setIsEditing,
}: {
  isEditing: boolean
  resetInitialState: () => void
  setIsEditing: Dispatch<SetStateAction<boolean>>
}) => {
  return isEditing ? (
    <>
      <Tooltip title={'Guardar cambios'} placement="top" arrow>
        <button
          type="submit"
          className="relative bg-transparent text-gray-500 hover:text-green-500 font-bold rounded pr-2 mr-2"
        >
          <DoneIcon />
        </button>
      </Tooltip>
      <Tooltip title={'Descartar Cambios'} placement="top" arrow>
        <button
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
        type="button"
        className="relative bg-transparent text-gray-500 hover:text-purple-500 font-bold rounded mr-2"
      >
        <EditIcon />
      </button>
    </Tooltip>
  )
}

const RestaurantInfo = ({ restaurantData }: { restaurantData: Restaurant }) => {
  const [isEditing, setIsEditing] = useState(false)

  const initialState = {
    name: restaurantData.name,
    weeklyCalendar: defaultWeek(),
    averageTimePerTable: null,
    selectedFile: null,
    restaurantType: null,
  }

  const resetInitialState = () => {
    setFormState(initialState)
  }

  const [formState, setFormState] = useState<FormState>(initialState)
  // const router = useRouter()
  const [showMap, setShowMap] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates>(null)
  const [address, setAddress] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formState, address)
    setIsLoading(true)
    try {
      const res = await updateRestaurantDetails({
        id: restaurantData.id,
        name: (formState.name || restaurantData.name) as string,
      })
      restaurantData = res
    } finally {
      setIsLoading(false)
      setIsEditing(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-6 mt-2">
      <form className="flex flex-col gap-6 relative" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Información del restaurante</h2>
          <div className="flex justify-start items-end">
            {isLoading ? (
              <Spinner />
            ) : (
              <EditButtons
                isEditing={isEditing}
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
          setAddress={setAddress}
          showMenuForm={false}
          disabled={!isEditing}
        />
      </form>
    </div>
  )
}

export default RestaurantInfo
