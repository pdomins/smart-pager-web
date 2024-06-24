import Snackbar from '@/components/utils/snackbar'
import { useState } from 'react'
import { WeeklyCalendar, RestaurantFormState } from './restaurant-form'
import { daysOfWeek } from '@/lib/dates'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
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
    const intervals = weeklyCalendar[day].intervals

    if (intervals.length === 0) {
      addInterval(day)
    }
  }

  const addInterval = (day: string) => {
    setFormState((prev) => ({
      ...prev,
      weeklyCalendar: {
        ...prev.weeklyCalendar,
        [day]: {
          ...prev.weeklyCalendar[day],
          intervals: [
            ...prev.weeklyCalendar[day].intervals,
            { openingTime: null, closingTime: null },
          ],
        },
      },
    }))
  }

  const removeInterval = (day: string, index: number) => {
    setFormState((prev) => {
      const intervals = prev.weeklyCalendar[day].intervals

      if (intervals.length === 1) {
        return {
          ...prev,
          weeklyCalendar: {
            ...prev.weeklyCalendar,
            [day]: {
              ...prev.weeklyCalendar[day],
              isOpen: false,
            },
          },
        }
      }

      return {
        ...prev,
        weeklyCalendar: {
          ...prev.weeklyCalendar,
          [day]: {
            ...prev.weeklyCalendar[day],
            intervals: intervals.filter((_, idx) => idx !== index),
          },
        },
      }
    })
  }

  const updateTime = (
    day: string,
    index: number,
    field: 'openingTime' | 'closingTime',
    time: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      weeklyCalendar: {
        ...prev.weeklyCalendar,
        [day]: {
          ...prev.weeklyCalendar[day],
          intervals: prev.weeklyCalendar[day].intervals.map((interval, idx) => {
            if (idx === index) {
              return {
                ...interval,
                [field]: time,
              }
            }
            return interval
          }),
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
                    className={`${styles.form_checkbox} disabled:cursor-not-allowed disabled:opacity-75`}
                    checked={weeklyCalendar[day].isOpen}
                    onChange={() =>
                      toggleDayOpen(day, !weeklyCalendar[day].isOpen)
                    }
                    disabled={disabled}
                  />
                  <h3 className="font-semibold text-gray-700">{day}</h3>
                  <button
                    onClick={() => {
                      addInterval(day)
                    }}
                    type="button"
                    disabled={disabled}
                    className="relative bg-transparent text-purple-500 hover:text-purple-700 font-bold rounded mr-2 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    <ControlPointIcon />
                  </button>
                </div>
                {weeklyCalendar[day].isOpen && (
                  <div className="flex gap-4 items-center flex-col">
                    <div className="flex flex-row w-full">
                      <label className="flex-1 text-gray-700">
                        Horario de apertura:{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <label className="flex-1 text-gray-700">
                        Horario de cierre:{' '}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {weeklyCalendar[day].intervals.map((interval, index) => (
                      <div className="flex flex-row w-full gap-x-1" key={index}>
                        <input
                          type="time"
                          className={`form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors`}
                          value={interval.openingTime || ''}
                          onChange={(e) =>
                            updateTime(
                              day,
                              index,
                              'openingTime',
                              e.target.value
                            )
                          }
                          required
                          disabled={disabled}
                        />

                        <input
                          type="time"
                          className={`form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors`}
                          value={interval.closingTime || ''}
                          onChange={(e) =>
                            updateTime(
                              day,
                              index,
                              'closingTime',
                              e.target.value
                            )
                          }
                          required
                          disabled={disabled}
                        />

                        <button
                          onClick={() => {
                            removeInterval(day, index)
                          }}
                          disabled={disabled}
                          type="button"
                          className="relative bg-transparent text-purple-500 hover:text-purple-700 font-bold rounded mr-2 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-75"
                        >
                          <RemoveCircleOutlineIcon />
                        </button>
                      </div>
                    ))}
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
