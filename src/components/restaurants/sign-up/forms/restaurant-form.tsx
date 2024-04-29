import { Coordinates } from '@/components/maps'
import RestaurantAverageTimePerTableForm from './restaurant-average-time-per-table-form'
import RestaurantLocationForm from './restaurant-location-form'
import RestaurantMenuForm from './restaurant-menu-form'
import RestaurantNameForm from './restaurant-name-form'
import RestaurantOpeningAndClosingTimesForm from './restaurant-opening-and-closing-times-form'
import { RestaurantTypeForm } from './restaurant-type'
import { FoodType } from '@/lib/food'

export type DayOfWeekInfo = {
  openingTime: string | null
  closingTime: string | null
  isTimeError: boolean
  isOpen: boolean
}

export type WeeklyCalendar = {
  [day: string]: DayOfWeekInfo
}

export type FormState = {
  name: string | null
  weeklyCalendar: WeeklyCalendar
  restaurantType: FoodType | null
  averageTimePerTable: string | null
  selectedFile: File | null
}

const RestaurantForm = ({
  formState,
  setFormState,
  coordinates,
  setCoordinates,
  showMap,
  setShowMap,
  setAddress,

  disabled = false,
  showMenuForm = true,
}: {
  formState: FormState
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
  coordinates: Coordinates
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>
  showMap: boolean
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
  disabled?: boolean
  showMenuForm?: boolean
}) => {
  return (
    <>
      <RestaurantNameForm
        name={formState.name || ''}
        setFormState={setFormState}
        disabled={disabled}
      />
      <RestaurantLocationForm
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        showMap={showMap}
        setShowMap={setShowMap}
        setAddress={setAddress}
        disabled={disabled}
      />
      <RestaurantOpeningAndClosingTimesForm
        weeklyCalendar={formState.weeklyCalendar}
        setFormState={setFormState}
        disabled={disabled}
      />
      <RestaurantTypeForm 
        restaurantType={formState.restaurantType || ''}
        setFormState={setFormState}
        disabled={disabled}/>
      <RestaurantAverageTimePerTableForm
        averageTimePerTable={formState.averageTimePerTable || ''}
        setFormState={setFormState}
        disabled={disabled}
      />
      {showMenuForm && (
        <RestaurantMenuForm setFormState={setFormState} disabled={disabled} />
      )}
    </>
  )
}

export default RestaurantForm
