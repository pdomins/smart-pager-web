import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useParams, useRouter } from 'next/navigation'
import { addPickUp } from '@/repositories/queue-repository'

export default function RetireForm({
  togglePickUpFormVisibility,
}: {
  togglePickUpFormVisibility: () => void
}) {
  const restaurantSlug = useParams<{ restaurant: string }>()
  const router = useRouter()

  useEffect(() => {
    const form = document.getElementById('retireForm')

    const handleQueueFormSubmit = async (e: Event) => {
      e.preventDefault()

      const emailInput = document.getElementById(
        'form-email'
      ) as HTMLInputElement | null
      const nameInput = document.getElementById(
        'form-name'
      ) as HTMLInputElement | null
      const pickupid = document.getElementById(
        'form-pickupid'
      ) as HTMLInputElement | null

      if (emailInput && nameInput && pickupid) {
        const success = await addPickUp(
          restaurantSlug.restaurant,
          emailInput.value,
          {
            name: nameInput.value,
            pickupid: pickupid.value,
          }
        )
        if (success)
          router.push(
            '/restaurants/' + restaurantSlug.restaurant + '/queued/pickup'
          )
        else
          router.push('/restaurants/' + restaurantSlug.restaurant + '/queued')
      } else {
        console.error('Some form elements are missing or inaccessible.')
      }
    }

    if (form) {
      form.addEventListener('submit', handleQueueFormSubmit)
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleQueueFormSubmit)
      }
    }
  })

  return (
    <div className="min-h-screen flex flex-col justify-center relative ">
      <div
        className="absolute top-2 left-2 cursor-pointer"
        onClick={togglePickUpFormVisibility}
      >
        <CloseIcon style={{ fontSize: '30px' }} />
      </div>
      <div className="py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Retire su pedido
        </h1>
        <p className="mt-2 text-gray-700">
          Deje sus datos y le avisaremos cuando su pedido este listo para ser
          retirado
        </p>
      </div>
      <div className="flex justify-center">
        <form id="retireForm" className="w-full max-w-lg">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-white-200 text-gray-700 shadow border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="form-email"
              type="email"
              placeholder="ejemplo@mail.com"
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-white-200 text-gray-700 shadow border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="form-name"
              type="text"
              placeholder="Su nombre y apellido"
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Número identificador de pedido{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-white-200 text-gray-700 shadow border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="form-pickupid"
              type="text"
              placeholder="Número de pedido"
              required
            />
          </div>

          <div className="px-3">
            <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold mt-4 py-2 rounded rounded-full w-full">
              Anotarse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
