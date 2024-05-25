import { useState } from 'react'
import { RestaurantFormState } from './restaurant-form'

const RestaurantAverageTimePerTableForm = ({
  averageTimePerTable,
  setFormState,
  disabled = false,
}: {
  averageTimePerTable: string
  setFormState: React.Dispatch<React.SetStateAction<RestaurantFormState>>
  disabled?: boolean
}) => {
  const [time, setTime] = useState(averageTimePerTable)
  const [error, setIsError] = useState(false)
  return (
    <label className="block">
      <span className="text-gray-700">
        Tiempo promedio por mesa (en minutos):{' '}
        <span className="text-red-500">*</span>
      </span>
      <input
        type="number"
        className={`${error && 'border-red-500 focus:border-red-500'} form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors`}
        placeholder="Ejemplo: 45"
        value={time}
        onChange={(e) => {
          const value = e.target.value
          setTime(value)
          if (Number(value) >= 0 && Number(value) <= 120) {
            setFormState((prev) => ({
              ...prev,
              averageTimePerTable: value,
            }))
            setIsError(false)
          } else {
            setIsError(true)
          }
        }}
        min={0}
        max={120}
        required
        disabled={disabled}
      />
      {error && (
        <div className="text-red-500 text-sm italic">
          El tiempo de espera debe ser mayor a cero y menor a dos horas.
        </div>
      )}
    </label>
  )
}
export default RestaurantAverageTimePerTableForm
