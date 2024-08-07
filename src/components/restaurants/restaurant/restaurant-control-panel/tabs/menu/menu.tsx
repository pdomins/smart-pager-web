import React, { useEffect, useRef, useState } from 'react'
import {
  updateRestaurantMenu,
  getRestaurantMenu,
} from '@/repositories/restaurant-respository'
import { RestaurantWithCoordinates } from '@/types/restaurant'
import Spinner from '@/components/utils/spinner'
import ViewMenu from './pdf'
import Snackbar from '@/components/utils/snackbar'

export default function RestaurantMenu({
  restaurantData,
}: {
  restaurantData: RestaurantWithCoordinates
}) {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [menu, setMenu] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [successfullyUploaded, setSuccessfullyUploaded] = useState(false)
  const [wrongFormat, setWrongFormat] = useState(false)
  const [wrongSize, setWrongSize] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [noFile, setNoFile] = useState(false)


  useEffect(() => {
    const getMenu = async () => {
      if (!restaurantData) return
      try {
        const menu_response = await getRestaurantMenu(restaurantData.id)
        setMenu(menu_response)
      } catch (error) {
        console.error('Error fetching the menu:', error)
      }
    }

    getMenu()
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    if (!inputFileRef.current || !inputFileRef.current.files) {
      setNoFile(true)
      return
    }

    const file = inputFileRef.current.files[0]

    const maxSizeInBytes = 2 * 1024 * 1024 // 2 MB

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setWrongFormat(true)
      return
    }

    if (file.size > maxSizeInBytes) {
      setWrongSize(true)
      return 
    }

    const response = await fetch(
      `/api/restaurants/upload?filename=${restaurantData.id}`,
      {
        method: 'POST',
        body: file,
      }
    )

    if (response.ok) {
      setIsUploading(false)
      
      const menu_response = await getRestaurantMenu(restaurantData.id)

      if (menu_response)
        await fetch(`/api/restaurants/upload?url=${menu_response}`, {
          method: 'DELETE',
        })

      const responseData = await response.json()
      setMenu(responseData.url)
      updateRestaurantMenu(restaurantData.id, responseData.url)
      setSuccessfullyUploaded(true);
    } else {
      setIsUploading(false)
      setHasError(true)
    }
  }

  return (
    <>  
    <Snackbar
        type="success"
        isOpen={successfullyUploaded}
        variant="filled"
        setIsOpen={setSuccessfullyUploaded}
        text="¡Listo! Menú subido con éxito."
      />
    <Snackbar
        type="error"
        isOpen={wrongFormat}
        variant="filled"
        setIsOpen={setWrongFormat}
        text="El archivo debe estar en formato PDF."
      />
    <Snackbar
        type="error"
        isOpen={wrongSize}
        variant="filled"
        setIsOpen={setWrongSize}
        text="El archivo debe tener un tamaño menor a 2MB."
      />
    <Snackbar
        type="error"
        isOpen={hasError}
        variant="filled"
        setIsOpen={setHasError}
        text="Error al subir el menú."
      />
    <Snackbar
        type="error"
        isOpen={noFile}
        variant="filled"
        setIsOpen={setNoFile}
        text="Ningún archivo seleccionado."
      />
    <div className="max-w-md mx-auto bg-white mt-2 p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-2 pb-2">
        {menu && (
          <>
            <button
              onClick={() => setIsMenuVisible(!isMenuVisible)}
              className="relative flex px-4 py-2 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-violet-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-white text-white">
                {isMenuVisible ? 'Minimizar mi menú' : 'Ver mi menú'}
              </span>
            </button>
            {isMenuVisible && (
              <div className="w-full max-w-md mt-4">
                <ViewMenu menu={menu} />
              </div>
            )}
          </>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-4">Subir el menú</h2>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">
            Elige un archivo en formato PDF con tamaño menor a 2MB - Esto es lo
            que verán sus clientes:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            ref={inputFileRef}
            accept=".pdf"
            className="relative mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        {isUploading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <button
            type="submit"
            className="relative flex px-6 h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-violet-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
          >
            <span className="relative text-white text-white">Subir menú</span>
          </button>
        )}
      </form>
    </div>
    </>
  )
}
