'use client'

import { Restaurant } from '@/types/restaurant'
import Gradient from '../../../style/gradient'
import Container from '../../../style/container'
import { useCallback, useEffect, useState } from 'react'
import ClientCard from './components/card'
import { assertAndReturn } from '@/lib/assertions'
import Loading from '@/components/utils/loading'
import { Tooltip } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import AddToQueueDialog from './components/dialog'
import EmptyCardWithMessage from '../components/empty-card'
import { useRouter } from 'next/navigation'
import { getPaginatedCommensals } from '@/services/kv/commensal-queue-service'
import { CommensalData } from '@/types/queues'
import SkeletonCard from '../components/skeleton-card'
import {
  callCommensal,
  acceptCommensal,
  cancelCommensal,
  retryCallCommensal,
} from '@/services/queue-service'

export default function RestaurantQueue({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const router = useRouter()
  const [waitingClients, setWaitingClients] = useState<CommensalData[]>()
  const [calledClients, setCalledClients] = useState<CommensalData[]>()
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  if (!restaurantData.slug) {
    return <Loading />
  }
  const restaurantSlug = assertAndReturn(restaurantData.slug)
  const restaurantName = assertAndReturn(restaurantData.name)

  const getCommensalList = useCallback(async () => {
    const waitingClients =
      (await getPaginatedCommensals({
        restaurantSlug,
        start: 0,
        end: 2,
        waiting: true,
      })) || []

    const calledClients =
      (await getPaginatedCommensals({
        restaurantSlug,
        start: 0,
        end: 2,
        waiting: false,
      })) || []

    setWaitingClients(waitingClients.queue)
    setCalledClients(calledClients.queue)
  }, [restaurantData.slug])

  useEffect(() => {
    getCommensalList()

    const intervalId = setInterval(() => {
      getCommensalList()
    }, 300000) // poll every 5 mins

    return () => clearInterval(intervalId)
  }, [getCommensalList])

  return (
    <div className="relative" id="queue">
      <AddToQueueDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        restaurantSlug={restaurantSlug}
        restaurantName={restaurantName}
        getCommensalList={getCommensalList}
      />
      <Gradient />
      <Container>
        <div className="text-center pt-20 pb-10">
          <h1 className="font-bold text-4xl md:text-5xl">
            Lista de <span className="text-purple-800">Comensales</span>
          </h1>
          <p className="mt-4 text-gray-700">
            Gestiona la lista de clientes esperando a ser atendidos.
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Clientes Esperando</h2>
            <div className="flex justify-end items-end space-x-2">
              <Tooltip title={'Agregar Cliente'} placement="top" arrow>
                <button
                  onClick={() => {
                    setIsOpenDialog(true)
                  }}
                  type="button"
                  className="relative bg-transparent text-purple-500 hover:text-purple-700 font-bold rounded mr-2"
                >
                  <AddCircle />
                </button>
              </Tooltip>
              <button
                onClick={() => {
                  router.push('/management/queue/waiting')
                }}
                className="relative text-purple-500 hover:text-purple-700 transition-colors"
              >
                Ver todo
              </button>
            </div>
          </div>

          {waitingClients ? (
            waitingClients?.length > 0 ? (
              waitingClients.map((client) => (
                <ClientCard
                  restaurantName={restaurantName}
                  key={client.email}
                  client={client}
                  onCallClient={async () => {
                    await callCommensal({
                      restaurantSlug,
                      restaurantName,
                      client,
                    })
                    await getCommensalList()
                  }}
                  onRemoveClient={async () => {
                    await cancelCommensal({
                      restaurantSlug,
                      restaurantName,
                      client,
                    })
                    await getCommensalList()
                  }}
                />
              ))
            ) : (
              <EmptyCardWithMessage message="No hay clientes esperando en este momento." />
            )
          ) : (
            <SkeletonCard />
          )}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Clientes Llamados</h2>
            <button
              onClick={() => {
                router.push('/management/queue/called')
              }}
              className="relative text-purple-500 hover:text-purple-700 transition-colors"
            >
              Ver todo
            </button>
          </div>

          {calledClients ? (
            calledClients.length > 0 ? (
              calledClients.map((client) => (
                <ClientCard
                  restaurantName={restaurantName}
                  key={client.email}
                  client={client}
                  onCallClient={async () => {
                    await retryCallCommensal({
                      restaurantName,
                      client,
                    })
                    await getCommensalList()
                  }}
                  onRemoveClient={async () => {
                    await cancelCommensal({
                      restaurantSlug,
                      restaurantName,
                      client,
                    })
                    await getCommensalList()
                  }}
                  onAcceptClient={async () => {
                    await acceptCommensal({ restaurantSlug, client })
                    await getCommensalList()
                  }}
                />
              ))
            ) : (
              <EmptyCardWithMessage message="Aún no se ha llamado ningún cliente." />
            )
          ) : (
            <SkeletonCard />
          )}
        </div>
      </Container>
    </div>
  )
}
