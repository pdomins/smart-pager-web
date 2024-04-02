import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useParams, useRouter } from 'next/navigation';

export default function RetireForm({
  togglePickUpFormVisibility,
}: {
  togglePickUpFormVisibility: () => void
}) {

  const restaurantSlug = useParams<{restaurant: string}>()
  const router = useRouter()


  useEffect(() => {
    const form = document.getElementById('retireForm')

    const handleQueueFormSubmit = (e: Event) => {
      e.preventDefault()

      console.log('form submitted with data: ')

      console.log(
        'email: ',
        (document.getElementById('form-email') as HTMLInputElement).value
      )
      console.log(
        'name: ',
        (document.getElementById('form-name') as HTMLInputElement).value
      )
      console.log(
        'numero de pedido: ',
        (document.getElementById('form-pickupid') as HTMLInputElement).value
      )
      router.push("/restaurants/" + restaurantSlug.restaurant + "/queued/pickup")
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
    <div className="min-h-screen font-sans flex flex-col justify-center relative ">
      <div className="absolute top-2 left-2 cursor-pointer" onClick={togglePickUpFormVisibility}>
        <CloseIcon style={{ fontSize: '30px' }} />
      </div>
      <div className="m-3">
          <h1 className="text-4xl text-center">Retire su pedido</h1>
          <p className="text-center">
            Deje sus datos y le avisaremos cuando su pedido este listo para ser retirado
          </p>
        </div>
        <div className='flex justify-center'>
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
                Número identificador de pedido <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-white-200 text-gray-700 shadow border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="form-pickupid"
                type="text"
                placeholder="Número de pedido"
                required
              />
            </div>
            
            <div className='px-3'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 rounded w-full">
                Anotarse
              </button>
            </div>
          </form>
      </div>
    </div>
  )
}
