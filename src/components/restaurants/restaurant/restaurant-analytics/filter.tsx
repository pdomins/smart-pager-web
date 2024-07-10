import { ANALYTICS_FILTER_TYPE } from '@/lib/analytics'

const Filter = ({
  filter,
  setFilter,
}: {
  filter: string
  setFilter: (value: string) => void
}) => {
  const fun = (value: string) => {
    setFilter(value)
  }
  return (
    <div>
      <label
        htmlFor="filter"
        className="flex block text-gray-700 text-sm font-bold mb-2"
      >
        Visualizar por:
      </label>
      <select
        id="filter"
        value={filter || ''}
        onChange={(e) => fun(e.target.value)}
        className="flex bg-white/50 relative border hover:border-violet-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value={ANALYTICS_FILTER_TYPE.DAY}>
          {ANALYTICS_FILTER_TYPE.DAY}
        </option>
        <option value={ANALYTICS_FILTER_TYPE.MONTH}>
          {ANALYTICS_FILTER_TYPE.MONTH}
        </option>
        <option value={ANALYTICS_FILTER_TYPE.YEAR}>
          {ANALYTICS_FILTER_TYPE.YEAR}
        </option>
      </select>
    </div>
  )
}

export default Filter
