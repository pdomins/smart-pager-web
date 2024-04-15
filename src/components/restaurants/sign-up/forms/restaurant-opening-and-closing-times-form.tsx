import Snackbar from '@/components/utils/snackbar'
import { useEffect, useState } from 'react'
import { FormState } from './restaurant-form'

const RestaurantOpeningAndClosingTimesForm = ({
  openingTime,
  closingTime,
  isTimeError,
  setFormState,
  disabled = false,
}: {
  openingTime: string
  closingTime: string
  isTimeError: boolean
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
  disabled?: boolean
}) => {
  const [showIsTimeError, setShowIsTimeError] = useState(false)

  useEffect(() => {
    setShowIsTimeError(isTimeError)
  }, [isTimeError])

  const validateTimes = ({
    opening,
    closing,
  }: {
    opening: string | null
    closing: string | null
  }) => {
    if (opening && closing) {
      setFormState((prev) => ({ ...prev, isTimeError: opening >= closing }))
    } else {
      setFormState((prev) => ({ ...prev, isTimeError: false }))
    }
  }
  return (
    <>
      <Snackbar
        type="error"
        isOpen={showIsTimeError}
        variant="filled"
        setIsOpen={setShowIsTimeError}
        text="Por favor, asegúrate que el horario de cierre sea mayor al de apertura."
      />
      <div className="flex gap-4 items-center">
        <label className="block flex-1">
          <span className="text-gray-700">
            Horario de apertura: <span className="text-red-500">*</span>
          </span>
          <input
            type="time"
            className={`${
              isTimeError && 'border-red-300'
            } form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors`}
            value={openingTime}
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, openingTime: e.target.value }))
              validateTimes({
                opening: e.target.value,
                closing: closingTime,
              })
            }}
            required
            disabled={disabled}
          />
        </label>
        <label className="block flex-1">
          <span className="text-gray-700">
            Horario de cierre: <span className="text-red-500">*</span>
          </span>
          <input
            type="time"
            className={`${
              isTimeError && 'border-red-300'
            } form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors`}
            value={closingTime}
            required
            disabled={disabled}
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, closingTime: e.target.value }))
              validateTimes({
                opening: openingTime,
                closing: e.target.value,
              })
            }}
          />
        </label>
      </div>
    </>
  )
}

export default RestaurantOpeningAndClosingTimesForm
