import { RestaurantFormState } from './restaurant-form'
import Pfp from 'public/club-mila.png'
import Image from 'next/image'
import FileUploadIcon from '@mui/icons-material/FileUpload'

const RestaurantNameForm = ({
  name,
  setFormState,
  disabled = false,
}: {
  name: string
  setFormState: React.Dispatch<React.SetStateAction<RestaurantFormState>>
  disabled?: boolean
}) => {
  return (
    <div className="block">
      <div className="flex items-center">
        <div className="relative inline-block">
          <Image
            src={Pfp.src}
            alt="Logo"
            unoptimized={true}
            width={75}
            height={75}
            loading="lazy"
            className="mr-1 rounded-full cursor-auto z-10"
          />
          {!disabled && (
            <button
              className="absolute bottom-0 right-0 bg-white/90 rounded-full p-1 shadow z-20"
              onClick={() => console.log('Edit icon clicked')}
              type="button"
            >
              <FileUploadIcon className="text-sm text-purple-500" />
            </button>
          )}
        </div>
        <div className="flex-1 pl-4">
          <span className="text-gray-700">
            Nombre del restaurante: <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
            placeholder="Ingresa el nombre del restaurante"
            value={name}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}
export default RestaurantNameForm
