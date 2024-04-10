const RestaurantOpeningAndClosingTimesForm = ({
  openingTime,
  setOpeningTime,
  closingTime,
  setClosingTime,
  setIsTimeError,
}: {
  openingTime: string
  setOpeningTime: React.Dispatch<React.SetStateAction<string | null>>
  closingTime: string
  setClosingTime: React.Dispatch<React.SetStateAction<string | null>>
  setIsTimeError: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const validateTimes = ({
    opening,
    closing,
  }: {
    opening: string | null
    closing: string | null
  }) => {
    if (opening && closing) {
      setIsTimeError(opening >= closing)
    } else {
      setIsTimeError(false)
    }
  }
  return (
    <div className="flex gap-4 items-center">
      <label className="block flex-1">
        <span className="text-gray-700">
          Horario de apertura: <span className="text-red-500">*</span>
        </span>
        <input
          type="time"
          className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
          value={openingTime}
          onChange={(e) => {
            setOpeningTime(e.target.value)
            validateTimes({
              opening: e.target.value,
              closing: closingTime,
            })
          }}
          required
        />
      </label>
      <label className="block flex-1">
        <span className="text-gray-700">
          Horario de cierre: <span className="text-red-500">*</span>
        </span>
        <input
          type="time"
          className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
          value={closingTime}
          required
          onChange={(e) => {
            setClosingTime(e.target.value)
            validateTimes({
              opening: openingTime,
              closing: e.target.value,
            })
          }}
        />
      </label>
    </div>
  )
}

export default RestaurantOpeningAndClosingTimesForm
