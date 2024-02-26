import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function QueueForm() {
  const router = useRouter()

  useEffect(() => {
    //on submit we redirect to /commensal/queue
    const form = document.getElementById('queueForm')

    const handleQueueFormSubmit = (e: Event) => {
      e.preventDefault()
      router.push('/commensal/queue')
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
      <form id="queueForm" className="w-full max-w-lg">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="ejemplo@mail.com"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nombre
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Nombre"
          />
        </div>
        <div className="md:w-1/2 px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Cantidad de comensales
          </label>
          <select className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
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
        <button className="bg-amber-500 border-gray-500 hover:bg-amber-700 text-white font-bold m-3 py-2 px-4 rounded">
          Anotarse
        </button>
      </form>
    </div>
  )
}