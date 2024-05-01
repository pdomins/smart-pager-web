import React, {
  useState,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import useOnclickOutside from 'react-cool-onclickoutside'
import { FoodType, foodTypes } from '@/lib/food'
import { RestaurantFormState } from './restaurant-form'

export const RestaurantTypeForm = ({
  restaurantType,
  setFormState,
  disabled = false,
}: {
  restaurantType: string
  setFormState: Dispatch<SetStateAction<RestaurantFormState>>
  disabled?: boolean
}) => {
  const [suggestions, setSuggestions] = useState<FoodType[]>(
    foodTypes.slice(0, 10)
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hasError, setHasError] = useState(false)

  const ref = useOnclickOutside(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    setSuggestions(foodTypes.slice(0, 10))
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!restaurantType) {
      setSuggestions(foodTypes.slice(0, -1))
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as FoodType
    setFormState((prev) => ({
      ...prev,
      restaurantType: value,
    }))
    setIsOpen(true)
    setHasError(false)

    if (value.length > 0) {
      const matchedSuggestions = foodTypes
        .filter((type) => type.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10)
      setSuggestions(matchedSuggestions)
    } else {
      setSuggestions(foodTypes.slice(0, 10))
    }
  }

  const handleSuggestionClick = (type: FoodType) => {
    setFormState((prev) => ({
      ...prev,
      restaurantType: type,
    }))
    setIsOpen(false)
    setHasError(false)
  }

  const validateFoodType = () => {
    setHasError(!foodTypes.includes(restaurantType as FoodType))
  }

  return (
    <label className="block relative" ref={ref}>
      <span className="text-gray-700">
        Tipo de restaurante: <span className="text-red-500">*</span>
      </span>
      <div className="flex items-center">
        <input
          type="text"
          value={restaurantType}
          onChange={handleInputChange}
          onBlur={validateFoodType}
          className={`${hasError && 'border-red-500'} px-4 py-2 w-full rounded-l-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors`}
          placeholder="Ejemplo: Comida vegetariana"
          required
          disabled={disabled}
        />
        <button
          onClick={toggleDropdown}
          type="button"
          className={`${hasError && 'bg-red-500'} px-4 py-2 rounded-r-full bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-75`}
          disabled={disabled}
        >
          ▼
        </button>
      </div>
      {hasError && (
        <div className="text-red-500 text-sm italic">
          Por favor, selecciona una opción de la lista
        </div>
      )}
      {isOpen && (
        <ul
          className="w-full bg-white shadow-lg rounded mt-2 absolute z-50 overflow-hidden border border-gray-200"
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          {suggestions.map((type, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      )}
    </label>
  )
}
