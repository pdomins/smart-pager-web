import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { Coordinates } from '.'
import useOnclickOutside from 'react-cool-onclickoutside'

const PlacesAutocomplete = ({
  setCoordinates,
  isRequired,
}: {
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>
  isRequired: boolean
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'loadSuggestions',
    requestOptions: { componentRestrictions: { country: 'ar' } },
    debounce: 50,
    cache: 86400,
  })
  const ref = useOnclickOutside(() => {
    clearSuggestions()
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false)
      clearSuggestions()

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0])
        setCoordinates({ lat, lng })
        console.log('📍 Coordinates: ', { lat, lng })
      })
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <div ref={ref} className="w-full">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        type="text"
        className="px-4 py-2  w-full rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
        placeholder="Dirección del restaurante"
        required={isRequired}
      />
      {status === 'OK' && (
        <ul className="w-1/3 bg-white shadow-lg rounded mt-2 absolute z-50 overflow-hidden border border-gray-200">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  )
}

export default PlacesAutocomplete
