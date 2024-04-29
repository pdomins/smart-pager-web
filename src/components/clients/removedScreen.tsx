import React, { useState } from 'react'
import Gradient from '../style/gradient'
import Snackbar from '../utils/snackbar'

export default function RemovedScreen() {
  const [description, setDescription] = useState('')
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSuccessfullySent(true)
    console.log('Motivo:', description)
    setDescription('')
  }

  return (
    <>
      <Snackbar
        type="success"
        isOpen={isSuccessfullySent}
        variant="filled"
        setIsOpen={setIsSuccessfullySent}
        text="¡Gracias! Seguiremos trabajando para brindarte el mejor servicio posible."
      />
      <div className="flex flex-col min-h-screen">
        <Gradient />
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <div className="w-full max-w-lg">
            <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center">
              Te desanotaste de la lista ☹
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-gray-700 italic text-center">
              Lamentamos verte partir, ¿nos contas un poco qué pasó?
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <textarea
                value={description}
                onChange={handleChange}
                placeholder="Ingrese su motivo aquí"
                className="relative w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
              />
              <button
                type="submit"
                className="relative mt-4 w-full bg-violet-700 hover:bg-violet-800 active:bg-violet-600 text-white font-semibold py-2 rounded-full transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-75"
                disabled={!description}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
