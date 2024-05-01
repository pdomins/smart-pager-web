import GoogleMaps, { Coordinates } from '../../../maps'
import PlacesAutocomplete from '../../../maps/autocomplete'

const RestaurantLocationForm = ({
  showMap,
  setShowMap,
  coordinates,
  setCoordinates,
  address,
  setAddress,
  disabled = false,
}: {
  showMap: boolean
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>
  coordinates: Coordinates
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>
  address: string | null
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
  disabled?: boolean
}) => {
  const toggleMap = () => {
    setShowMap(!showMap)
  }
  return (
    <label className="block">
      <span className="text-gray-700">
        Ubicación: <span className="text-red-500">*</span>
      </span>
      <div className={`${showMap && 'mb-6'} flex items-center space-x-4 mt-1`}>
        <PlacesAutocomplete
          setCoordinates={setCoordinates}
          address={address}
          setAddress={setAddress}
          isRequired={true}
          disabled={disabled}
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
  )
}

export default RestaurantLocationForm
