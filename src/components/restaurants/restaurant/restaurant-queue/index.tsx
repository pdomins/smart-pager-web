'use client'

import { Restaurant } from '@/types/restaurant'
import Gradient from '../../../style/gradient'
import Container from '../../../style/container'
import { useCallback, useEffect, useState } from 'react'
import ClientCard from './card'
import {
  CommensalData,
  getPaginatedCommensals,
  removeCommensal,
  updateCommensalStatus,
} from '@/repositories/queue-repository'
import { assertAndReturn } from '@/lib/assertions'
import Loading from '@/components/utils/loading'
const NoClientsMessage = ({ message }: { message: string }) => (
  <div className="my-10 py-5 px-4 bg-white shadow rounded-lg flex justify-center items-center">
    <p className="text-gray-600">{message}</p>
  </div>
)

export default function RestaurantQueue({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const [waitingClients, setWaitingClients] = useState<CommensalData[]>()
  const [calledClients, setCalledClients] = useState<CommensalData[]>()

  if (!restaurantData.slug) {
    return <Loading />
  }
  const restaurantSlug = assertAndReturn(restaurantData.slug)

  const getCommensalList = useCallback(async () => {
    const commensals = await getPaginatedCommensals({
      restaurantSlug,
      start: 0,
      end: 3,
    })

    if (commensals === null || commensals.length === 0) {
      setWaitingClients([])
      setCalledClients([])
      return []
    }

    if (commensals === null) return
    const waitingClients = commensals.filter(
      (commensal) => commensal.status === 'waiting'
    )

    const calledClients = commensals.filter(
      (commensal) => commensal.status === 'called'
    )

    setWaitingClients(waitingClients)
    setCalledClients(calledClients)

    return commensals
  }, [restaurantData.slug])

  useEffect(() => {
    getCommensalList()

    const intervalId = setInterval(() => {
      getCommensalList()
      // }, 5000) // every 5 secs here -> uncomment for debugging
      // }, 60000) // poll every 60 secs here (1 minute)
    }, 300000) // poll every 5 mins here

    return () => clearInterval(intervalId)
  }, [getCommensalList]) // calling useEffect like this for polling

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

          {waitingClients && waitingClients?.length > 0 ? (
            waitingClients.map((client) => (
              <ClientCard
                key={client.email}
                name={client.name}
                commensals={client.groupSize}
                description={client.description}
                onCallClient={async () => {
                  await updateCommensalStatus({ email: client.email })
                  await getCommensalList()
                }}
                onRemoveClient={async () => {
                  await removeCommensal({
                    restaurantSlug,
                    email: client.email,
                  })
                  await getCommensalList()

                  // add here logic of removed commensals without completion if needed (for metrics)
                }}
              />
            ))
          ) : (
            <NoClientsMessage message="No hay clientes esperando en este momento." />
          )}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Clientes Llamados</h2>
            <button
              onClick={() => {}}
              className="relative text-purple-500 hover:text-purple-700 transition-colors"
            >
              Ver todo
            </button>
          </div>

          {calledClients && calledClients.length > 0 ? (
            calledClients.map((client) => (
              <ClientCard
                key={client.email}
                name={client.name}
                commensals={client.groupSize}
                onCallClient={() => {}}
                onRemoveClient={async () => {
                  await removeCommensal({
                    restaurantSlug,
                    email: client.email,
                  })
                  await getCommensalList()

                  // add here logic of removed commensals without completion if needed (for metrics)
                }}
                onAcceptClient={async () => {
                  await removeCommensal({
                    restaurantSlug,
                    email: client.email,
                  })
                  await getCommensalList()

                  // add here logic of removed commensals on acceptance if needed (for metrics)
                }}
              />
            ))
          ) : (
            <NoClientsMessage message="Aún no se ha llamado ningún cliente." />
          )}
        </div>
      </Container>
    </div>
  )
}
