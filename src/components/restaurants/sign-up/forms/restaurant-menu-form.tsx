const RestaurantMenuForm = ({
  setSelectedFile,
}: {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    const maxSizeInBytes = 2 * 1024 * 1024 // 2 MB

    if (file && file.name.toLowerCase().endsWith('.pdf')) {
      if (file.size > maxSizeInBytes) {
        alert(
          'File size exceeds the maximum limit (2MB). Please choose a smaller file.'
        )
        setSelectedFile(null)
        return
      }
      setSelectedFile(file)
    } else {
      alert('El archivo debe estar en formato PDF.')
      setSelectedFile(null)
    }
  }
  return (
    <label className="block">
      <span className="text-gray-700">
        Cargar menú: <span className="text-red-500">*</span>
      </span>
      <input
        type="file"
        id="file"
        name="file"
        accept=".pdf"
        className="form-input bg-white text-gray-400 mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
        onChange={handleFileChange}
        required
      />
    </label>
  )
}
export default RestaurantMenuForm
