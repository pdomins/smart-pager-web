'use client'

import { Restaurant } from '@/types/restaurant'
import Gradient from '../../style/gradient'
import Container from '../../style/container'
import { useEffect, useState } from 'react'
import ClientCard from './card'

export default function RestaurantQueue({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  console.log(restaurantData)
  const [waitingClients, setWaitingClients] = useState([
    { id: 1, name: 'John Doe', guests: '3' },
    { id: 2, name: 'Jane Doe', guests: '2' },
  ])
  const [calledClients, setCalledClients] = useState([
    { id: 1, name: 'John Doe', guests: '3' },
    { id: 2, name: 'Jane Doe', guests: '2' },
  ])

  useEffect(() => {
    setWaitingClients((clients) => [
      ...clients,
      { id: 3, name: 'John Doe2', guests: '5' },
    ])
    
    setCalledClients((clients) => [...clients])
  }, [])

  return (
    <div className="relative" id="queue">
      <Gradient />
      <Container>
        <div className="text-center pt-20 pb-10">
          <h1 className="font-bold text-4xl md:text-5xl">
            Lista de <span className="text-purple-800">Espera</span>
          </h1>
          <p className="mt-4 text-gray-700">
            Gestiona la lista de clientes esperando a ser atendidos.
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Clientes Esperando</h2>
            <button
              onClick={() => {}}
              className="relative text-purple-500 hover:text-purple-700 transition-colors"
            >
              Ver todo
            </button>
          </div>

          {waitingClients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              commensals={client.guests}
            />
          ))}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Clientes Llamados</h2>
            <button
              onClick={() => {}}
              className="relative text-purple-500 hover:text-purple-700 transition-colors"
            >
              Ver todo
            </button>
          </div>

          {calledClients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              commensals={client.guests}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
