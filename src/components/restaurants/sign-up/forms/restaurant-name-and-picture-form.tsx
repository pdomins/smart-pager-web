import { RestaurantFormState } from './restaurant-form'
import Placeholder from 'public/placeholder.svg'
import Image from 'next/image'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Tooltip } from '@mui/material'
import { ChangeEvent } from 'react'

const RestaurantNameForm = ({
  name,
  picture,
  setFormState,
  disabled = false,
}: {
  name: string
  picture: string | null
  setFormState: React.Dispatch<React.SetStateAction<RestaurantFormState>>
  disabled?: boolean
}) => {
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormState((prev) => ({
          ...prev,
          picture: reader.result as string,
          pictureFile: file,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="block">
      <div className="flex items-center">
        <div className="relative inline-block">
          <Image
            src={picture || Placeholder.src}
            alt="Profile Picture"
            unoptimized={true}
            width={75}
            height={75}
            loading="lazy"
            className="mr-1 rounded-full cursor-auto z-10"
          />
          {!disabled && (
            <Tooltip title={'Subir nueva foto'} placement="bottom" arrow>
              <label className="absolute bottom-0 right-0 bg-white/90 rounded-full p-1 shadow z-20 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e)}
                  required
                  disabled={disabled}
                />
                <FileUploadIcon className="text-sm text-purple-500" />
              </label>
            </Tooltip>
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
