import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
import { Ref, forwardRef, useState } from 'react'
import { ANALYTICS_FILTER_TYPE, getDateFormat } from '@/lib/analytics'
registerLocale('es', es)

interface ExampleCustomInputProps {
  value?: string
  onClick?: () => void
}

const CustomDatePicker = ({
  filter,
  minDate,
}: {
  filter: string
  minDate?: Date
}) => {
  const [startDate, setStartDate] = useState(new Date())

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    ExampleCustomInputProps
  >(({ value, onClick }, ref: Ref<HTMLButtonElement>) => (
    <button
      className="flex bg-white/50 relative border hover:border-violet-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ))

  const getDatePickerProps = (mode: string) => {
    switch (mode) {
      case ANALYTICS_FILTER_TYPE.DAY:
        return {}
      case ANALYTICS_FILTER_TYPE.MONTH:
        return { showMonthYearPicker: true }
      case ANALYTICS_FILTER_TYPE.YEAR:
        return { showYearPicker: true }
      default:
        return {}
    }
  }

  const getMinDate = () => {
    return minDate ? { minDate: minDate } : {}
  }

  return (
    <div>
      <label
        htmlFor="date-picker"
        className="flex block text-gray-700 text-sm font-bold mb-2"
      >
        Fecha seleccionada:
      </label>
      <DatePicker
        className="relative"
        selected={startDate}
        onChange={(date) => setStartDate(date || new Date())}
        dateFormat={getDateFormat(filter)}
        locale="es"
        customInput={<ExampleCustomInput />}
        maxDate={new Date()}
        {...getDatePickerProps(filter)}
        {...getMinDate()}
      />
    </div>
  )
}

export default CustomDatePicker
