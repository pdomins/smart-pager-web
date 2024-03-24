import React, { useRef } from 'react'
import {
  updateRestaurantMenu,
  getRestaurantMenu,
} from '@/repositories/restaurant-respository'
import { Restaurant } from '@/types/restaurant'

export default function RestaurantMenu({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Subir el menú</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

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
            alert('Menú subido con éxito.') //TODO MODAL ?
            const menu_response = await getRestaurantMenu(restaurantData.id)

            console.log(menu_response)

            await fetch(`/api/restaurants/upload?url=${menu_response}`, {
              method: 'DELETE',
            })

            const responseData = await response.json()
            updateRestaurantMenu(restaurantData.id, responseData.url)
          } else alert('Error al subir el menú.') // TODO MODAL ?
        }}
      >
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
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Subir archivo
        </button>
      </form>
    </div>
  )
}
