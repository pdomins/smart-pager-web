import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function RetireForm(
  { toggleRetireFormVisibility }: { toggleRetireFormVisibility: () => void }
) {
  const router = useRouter()

  useEffect(() => {
    //on submit we redirect to /commensal/queue
    const form = document.getElementById('retireForm')

    const handleQueueFormSubmit = (e: Event) => {
      e.preventDefault()

      console.log('form submitted with data: ')

      console.log('email: ', (document.getElementById('form-email') as HTMLInputElement).value)
      console.log('name: ', (document.getElementById('form-first-name') as HTMLInputElement).value)
      console.log('numero de pedido: ', (document.getElementById('form-numero') as HTMLInputElement).value)

      // router.push('/commensal/retire')
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
      <div className="absolute top-2 left-2">
        <CloseIcon onClick={toggleRetireFormVisibility} />
      </div>
      <form id="retireForm" className="w-full max-w-lg">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-white-200 text-gray-700 shadow border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="form-email"
            type="text"
            placeholder="ejemplo@mail.com"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Número de pedido
          </label>
          <input
            className="appearance-none block w-full bg-white-200 text-gray-700 shadow border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="form-numero"
            type="text"
            placeholder="Número de pedido"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nombre
          </label>
          <input
            className="appearance-none block w-full bg-white-200 text-gray-700 shadow border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="form-first-name"
            type="text"
            placeholder="Nombre"
          />
        </div>

        <button className="bg-complementary-blue border-gray-500 hover:bg-custom-beige text-white font-bold m-3 py-2 px-4 rounded">
          Anotarse
        </button>
      </form>
    </div>
  )
}
