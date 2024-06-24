import { Coordinates } from '@/components/maps'
import RestaurantAverageTimePerTableForm from './restaurant-average-time-per-table-form'
import RestaurantLocationForm from './restaurant-location-form'
import RestaurantNameForm from './restaurant-name-form'
import RestaurantOpeningAndClosingTimesForm from './restaurant-opening-and-closing-times-form'
import { RestaurantTypeForm } from './restaurant-type'
import { FoodType } from '@/lib/food'

export type OpenCloseInterval = {
  openingTime: string | null
  closingTime: string | null
}

export type DayOfWeekInfo = {
  intervals: OpenCloseInterval[]
  isOpen: boolean
}

export type WeeklyCalendar = {
  [day: string]: DayOfWeekInfo
}

export type RestaurantFormState = {
  name: string | null
  weeklyCalendar: WeeklyCalendar
  restaurantType: FoodType | null
  averageTimePerTable: string | null
}

const RestaurantForm = ({
  formState,
  setFormState,
  coordinates,
  setCoordinates,
  showMap,
  setShowMap,
  address,
  setAddress,
  disabled = false,
}: {
  formState: RestaurantFormState
  setFormState: React.Dispatch<React.SetStateAction<RestaurantFormState>>
  coordinates: Coordinates
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>
  showMap: boolean
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>
  address: string | null
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
  disabled?: boolean
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
        address={address}
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
        disabled={disabled}
      />
      <RestaurantAverageTimePerTableForm
        averageTimePerTable={formState.averageTimePerTable || ''}
        setFormState={setFormState}
        disabled={disabled}
      />
    </>
  )
}

export default RestaurantForm
