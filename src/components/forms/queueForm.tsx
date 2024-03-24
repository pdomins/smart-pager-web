import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'

export default function QueueForm({
  toggleQueueFormVisibility,
}: {
  toggleQueueFormVisibility: () => void
}) {
  useEffect(() => {
    //on submit we redirect to /commensal/queue
    const form = document.getElementById('queueForm')

    const handleQueueFormSubmit = (e: Event) => {
      e.preventDefault()
      console.log('form submitted with data: ')
      console.log(
        'email: ',
        (document.getElementById('form-email') as HTMLInputElement).value
      )
      console.log(
        'name: ',
        (document.getElementById('form-first-name') as HTMLInputElement).value
      )
      console.log(
        'comensales: ',
        (document.getElementById('form-comensales') as HTMLInputElement).value
      )
      // router.push('/commensal/queue')
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
    <div className="min-h-screen  flex flex-col justify-center relative ">
      <div className="absolute top-2 left-2">
        <CloseIcon onClick={toggleQueueFormVisibility} />
      </div>
      <div className="m-3">
        <h1 className="text-4xl text-center">Anotate en la cola</h1>
        <p className="text-center">
          Dejanos tus datos y te avisamos cuando tu mesa esté lista
        </p>
      </div>
      <form id="queueForm" className="mt-6 w-full max-w-lg">
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
            Nombre
          </label>
          <input
            className="appearance-none block w-full bg-white-200 text-gray-700 border shadow rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="form-first-name"
            type="text"
            placeholder="Nombre"
          />
        </div>
        <div className="md:w-1/2 px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Cantidad de comensales
          </label>
          <select
            id="form-comensales"
            className="block w-full bg-white border  hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>
        <button className="bg-complementary-blue border-gray-500 hover:bg-custom-beige text-white font-bold m-3 py-2 px-4 rounded">
          Anotarse
        </button>
      </form>
    </div>
  )
}
