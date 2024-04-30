import Snackbar from '@/components/utils/snackbar'
import { useState } from 'react'
import { WeeklyCalendar, RestaurantFormState } from './restaurant-form'
import { daysOfWeek } from '@/lib/dates'
import styles from './styles.module.css'

const RestaurantOpeningAndClosingTimesForm = ({
  weeklyCalendar,
  setFormState,
  disabled = false,
}: {
  weeklyCalendar: WeeklyCalendar
  setFormState: React.Dispatch<React.SetStateAction<RestaurantFormState>>
  disabled?: boolean
}) => {
  const [showForm, setShowForm] = useState(false)
  const [showIsTimeError, setShowIsTimeError] = useState(false)

  // const validateTimes = (
  //   day: string,
  //   opening: string | null,
  //   closing: string | null
  // ) => {
  //   const parseTime = (timeStr: string | null) => {
  //     if (!timeStr) return null
  //     return new Date(`2024-01-01T${timeStr.split(' ').join('')}`)
  //   }

  //   const openingDate = parseTime(opening)
  //   const closingDate = parseTime(closing)
  //   const isTimeError =
  //     openingDate && closingDate ? openingDate >= closingDate : false

  //   console.log(isTimeError)
  //   setShowIsTimeError(isTimeError)
  //   setFormState((prev) => ({
  //     ...prev,
  //     weeklyCalendar: {
  //       ...prev.weeklyCalendar,
  //       [day]: {
  //         ...prev.weeklyCalendar[day],
  //         isTimeError,
  //       },
  //     },
  //   }))
  // }

  const toggleDayOpen = (day: string, isOpen: boolean) => {
    setFormState((prev) => ({
      ...prev,
      weeklyCalendar: {
        ...prev.weeklyCalendar,
        [day]: {
          ...prev.weeklyCalendar[day],
          isOpen,
        },
      },
    }))
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
      <div>
        <div className="flex space-x-5">
          <span className="text-gray-700">
            Horarios de atención: <span className="text-red-500 ">*</span>
          </span>

          <button
            onClick={() => setShowForm(!showForm)}
            className="relative text-violet-500 "
            type="button"
          >
            {showForm ? 'Ocultar horarios' : 'Mostrar horarios'}
          </button>
        </div>
        <span className="text-gray-500 text-xs">
          Selecciona los días y horarios de atención de tu restaurante
        </span>

        {showForm && (
          <>
            {daysOfWeek.map((day) => (
              <div key={day} className="flex flex-col gap-2 p-4 border-b">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className={`${styles.form_checkbox}`}
                    checked={weeklyCalendar[day].isOpen}
                    onChange={() =>
                      toggleDayOpen(day, !weeklyCalendar[day].isOpen)
                    }
                    disabled={disabled}
                  />
                  <h3 className="font-semibold text-gray-700">{day}</h3>
                </div>
                {weeklyCalendar[day].isOpen && (
                  <div className="flex gap-4 items-center">
                    <label className="flex-1 text-gray-700">
                      Horario de apertura:{' '}
                      <span className="text-red-500">*</span>
                      <input
                        type="time"
                        className={`form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors`}
                        value={weeklyCalendar[day].openingTime || ''}
                        onChange={(e) => {
                          setFormState((prev) => ({
                            ...prev,
                            weeklyCalendar: {
                              ...prev.weeklyCalendar,
                              [day]: {
                                ...prev.weeklyCalendar[day],
                                openingTime: e.target.value,
                              },
                            },
                          }))
                          // validateTimes(
                          //   day,
                          //   e.target.value,
                          //   weeklyCalendar[day].closingTime
                          // )
                        }}
                        required
                        disabled={disabled}
                      />
                    </label>
                    <label className="flex-1 text-gray-700">
                      Horario de cierre: <span className="text-red-500">*</span>
                      <input
                        type="time"
                        className={`form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors`}
                        value={weeklyCalendar[day].closingTime || ''}
                        onChange={(e) => {
                          setFormState((prev) => ({
                            ...prev,
                            weeklyCalendar: {
                              ...prev.weeklyCalendar,
                              [day]: {
                                ...prev.weeklyCalendar[day],
                                closingTime: e.target.value,
                              },
                            },
                          }))
                          // validateTimes(
                          //   day,
                          //   weeklyCalendar[day].openingTime,
                          //   e.target.value
                          // )
                        }}
                        required
                        disabled={disabled}
                      />
                    </label>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default RestaurantOpeningAndClosingTimesForm
