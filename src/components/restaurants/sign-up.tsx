import React, { FormEvent } from 'react'
import Container from './new/container'
import Gradient from './new/gradient'
import { useRouter } from 'next/navigation'

export default function RestaurantSignUp() {
  // TODO aca deberiamos checkear que no este la info, sino lo mandamos a /management directo porque no tiene sentido que esten en esta pantalla
  const router = useRouter()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted')
    router.push('/management')
  }

  return (
    <div className="relative" id="signup">
      <Gradient />
      <Container>
        <div className="relative pt-36 pb-20 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl">
              Completa tu perfil en{' '}
              <span className="text-purple-800">Smart Pager</span>
            </h1>
            <p className="mt-8 text-gray-700">
              Te pedimos algunos detalles adicionales para poder brindar la
              mejor atención posible, tanto a vos como a tus clientes.
            </p>
          </div>
          <div className="mt-10 md:mt-16 lg:w-1/2 lg:mx-auto">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre del restaurante"
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
              />
              <input
                type="text"
                placeholder="Dirección del restaurante"
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
              />
              <div className="flex gap-4">
                <p className="text-gray-700">Horario de apertura:</p>
                <input
                  type="time"
                  placeholder="Apertura (e.g., 10:00)"
                  className="px-4 py-2 w-1/2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                />
                <p className="text-gray-700">Horario de cierre:</p>
                <input
                  type="time"
                  placeholder="Cierre (e.g., 22:00)"
                  className="px-4 py-2 w-1/2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                />
              </div>
              <input
                type="number"
                placeholder="Cantidad de mesas"
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
              />
              <input
                type="text"
                placeholder="Tiempo promedio por mesa (en minutos)"
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
              />
              {/* Despues vemos si necesitamos algo mas y como formattear mejor estas cosas, pero para tener una base (tmb despues lo conectamos) */}
              <button
                type="submit"
                className="mt-4 px-6 py-2 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-800 transition-colors"
              >
                Finalizar Registro
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}
