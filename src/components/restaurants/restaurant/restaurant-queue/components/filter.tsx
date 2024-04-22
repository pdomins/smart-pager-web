const Filter = ({
  groupSize,
  setGroupSize,
}: {
  groupSize: string
  setGroupSize: (value: string) => void
}) => {
  const fun = (value: string) => {
    setGroupSize(value)
  }
  return (
    <div>
      <label
        htmlFor="groupSize"
        className="flex block text-gray-700 text-sm font-bold mb-2"
      >
        Tamaño de grupo:
      </label>
      <select
        id="groupSize"
        value={groupSize || ''}
        onChange={(e) => fun(e.target.value)}
        className="flex relative border hover:border-violet-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">-</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6 o más</option>
      </select>
    </div>
  )
}

export default Filter
