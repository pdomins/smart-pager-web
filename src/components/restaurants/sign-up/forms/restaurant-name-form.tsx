const RestaurantNameForm = ({
  name,
  setName,
}: {
  name: string
  setName: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  return (
    <label className="block">
      <span className="text-gray-700">
        Nombre del restaurante: <span className="text-red-500">*</span>
      </span>
      <input
        type="text"
        className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
        placeholder="Ingresa el nombre del restaurante"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </label>
  )
}
export default RestaurantNameForm
