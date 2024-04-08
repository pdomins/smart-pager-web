import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useParams, useRouter } from 'next/navigation'
import { addCommensal } from '@/repositories/queue-repository'

export default function CommensalQueueForm({
  toggleCommensalFormVisibility,
}: {
  toggleCommensalFormVisibility: () => void
}) {
  const restaurantSlug = useParams<{ restaurant: string }>()
  const router = useRouter()

  useEffect(() => {
    const form = document.getElementById('queueForm')

    const handleQueueFormSubmit = async (e: Event) => {
      e.preventDefault()

      const emailInput = document.getElementById(
        'form-email'
      ) as HTMLInputElement | null
      const nameInput = document.getElementById(
        'form-name'
      ) as HTMLInputElement | null
      const commensalsInput = document.getElementById(
        'form-commensals'
      ) as HTMLInputElement | null

      if (emailInput && nameInput && commensalsInput) {
        const success = await addCommensal({
          restaurantSlug: restaurantSlug.restaurant,
          email: emailInput.value,
          clientData: {
            name: nameInput.value,
            groupSize: commensalsInput.value,
            description: '',
            phoneNumber: '',
          },
        })
        if (success)
          router.push(
            '/restaurants/' + restaurantSlug.restaurant + '/queued/commensal'
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
  }, [restaurantSlug, router])

  return (
    <div className="min-h-screen flex flex-col justify-center relative">
      <div
        className="absolute top-2 left-2 cursor-pointer"
        onClick={toggleCommensalFormVisibility}
      >
        <CloseIcon style={{ fontSize: '30px' }} />
      </div>
      <div className="py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Anótese en la cola
        </h1>
        <p className="mt-2 text-gray-700">
          Deje sus datos y le avisaremos cuando su mesa este preparada
        </p>
      </div>
      <div className="flex justify-center">
        <form id="queueForm" className="mt-6 w-full max-w-lg">
          <div className="w-full px-3 mb-6 md:mb-0">
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
              className="appearance-none block w-full bg-white-200 text-gray-700 border shadow rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="form-name"
              type="text"
              placeholder="Su nombre y apellido"
              required
            />
          </div>
          <div className=" px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Cantidad de comensales <span className="text-red-500">*</span>
            </label>
            <select
              id="form-commensals"
              className="block w-full bg-white border  hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6 o más</option>
            </select>
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
