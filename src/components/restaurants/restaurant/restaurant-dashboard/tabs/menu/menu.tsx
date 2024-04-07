import React, { useEffect, useRef, useState } from 'react'
import {
  updateRestaurantMenu,
  getRestaurantMenu,
} from '@/repositories/restaurant-respository'
import { Restaurant } from '@/types/restaurant'
import Spinner from '@/components/utils/spinner'
import ViewMenu from './pdf'

export default function RestaurantMenu({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [menu, setMenu] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

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
      alert('Ningún archivo seleccionado') //TODO MODAL?
      return
    }

    const file = inputFileRef.current.files[0]

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('El archivo debe estar en formato PDF.') //TODO MODAL?
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
      alert('Menú subido con éxito.') //TODO MODAL ?
      const menu_response = await getRestaurantMenu(restaurantData.id)

      if (menu_response)
        await fetch(`/api/restaurants/upload?url=${menu_response}`, {
          method: 'DELETE',
        })

      const responseData = await response.json()
      setMenu(responseData.url)
      updateRestaurantMenu(restaurantData.id, responseData.url)
    } else {
      setIsUploading(false)
      alert('Error al subir el menú.')
    } // TODO MODAL ?
  }

  return (
    <div className="max-w-md mx-auto bg-white mt-2 p-6 rounded-lg shadow-md">
      {menu && <ViewMenu menu={menu} />}
      <h2 className="text-xl font-semibold mb-4">Subir el menú</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">
            Elige un archivo en formato PDF - Esto es lo que verán sus clientes:
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
            className="relative px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-700"
          >
            Subir archivo
          </button>
        )}
      </form>
    </div>
  )
}
