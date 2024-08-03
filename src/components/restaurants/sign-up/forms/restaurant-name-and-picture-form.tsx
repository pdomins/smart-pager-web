import { RestaurantFormState } from './restaurant-form'
import Placeholder from 'public/placeholder.svg'
import Image from 'next/image'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Tooltip } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import Snackbar from '@/components/utils/snackbar'

const SIZE_LIMIT = 25 * 1024 // 25 KB

const RestaurantNameForm = ({
  name,
  pictureUrl,
  setFormState,
  disabled = false,
}: {
  name: string
  pictureUrl: string | null
  setFormState: React.Dispatch<React.SetStateAction<RestaurantFormState>>
  disabled?: boolean
}) => {
  const [hasError, setHasError] = useState(false)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null
    if (file) {
      if (file.size > SIZE_LIMIT) {
        setHasError(true)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormState((prev) => ({
          ...prev,
          pictureFile: file,
          pictureUrl: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="block">
      <Snackbar
        type="error"
        isOpen={hasError}
        variant="filled"
        setIsOpen={setHasError}
        text="Por favor, asegurate que tu imágen sea menor que 25KB."
      />
      <div className="flex items-center">
        <div className="relative inline-block">
          <Image
            src={pictureUrl || Placeholder.src}
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
