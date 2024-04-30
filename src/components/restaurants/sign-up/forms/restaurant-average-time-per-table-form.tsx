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
  return (
    <label className="block">
      <span className="text-gray-700">
        Tiempo promedio por mesa (en minutos):{' '}
        <span className="text-red-500">*</span>
      </span>
      <input
        type="number"
        className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
        placeholder="Ejemplo: 45"
        value={averageTimePerTable}
        onChange={(e) =>
          setFormState((prev) => ({
            ...prev,
            averageTimePerTable: e.target.value,
          }))
        }
        required
        disabled={disabled}
      />
    </label>
  )
}
export default RestaurantAverageTimePerTableForm
