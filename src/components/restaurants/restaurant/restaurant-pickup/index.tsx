'use order'

import { Restaurant } from '@/types/restaurant'
import Gradient from '../../../style/gradient'
import Container from '../../../style/container'
import { useCallback, useEffect, useState } from 'react'
import { assertAndReturn } from '@/lib/assertions'
import Loading from '@/components/utils/loading'
import { Tooltip } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import { useRouter } from 'next/navigation'

import { PickUpData } from '@/types/queues'
import PickUpCard from './components/card'
import EmptyCardWithMessage from '../components/empty-card'
import SkeletonCard from '../components/skeleton-card'
import { getPaginatedPickUps } from '@/services/kv/pickup-queue-service'
import AddPickUpDialog from './components/dialog'
import {
  acceptPickUp,
  callPickUp,
  cancelPickUp,
  retryCallPickUp,
} from '@/services/queue-service'

export default function RestaurantQueue({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const router = useRouter()
  const [waitingOrders, setWaitingOrders] = useState<PickUpData[]>()
  const [calledOrders, setCalledOrders] = useState<PickUpData[]>()
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  if (!restaurantData.slug) {
    return <Loading />
  }
  const restaurantSlug = assertAndReturn(restaurantData.slug)
  const restaurantName = assertAndReturn(restaurantData.name)

  const getPickUpList = useCallback(async () => {
    const waitingOrders =
      (await getPaginatedPickUps({
        restaurantSlug,
        start: 0,
        end: 2,
        waiting: true,
      })) || []

    const calledOrders =
      (await getPaginatedPickUps({
        restaurantSlug,
        start: 0,
        end: 2,
        waiting: false,
      })) || []

    setWaitingOrders(waitingOrders.queue)
    setCalledOrders(calledOrders.queue)
  }, [restaurantData.slug])

  useEffect(() => {
    getPickUpList()

    const intervalId = setInterval(() => {
      // getPickUpList()
    }, 300000) // poll every 5 mins

    return () => clearInterval(intervalId)
  }, [getPickUpList])

  return (
    <div className="relative" id="queue">
      <AddPickUpDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        restaurantSlug={restaurantData.slug}
        getPickUpList={getPickUpList}
      />
      <Gradient />
      <Container>
        <div className="text-center pt-20 pb-10">
          <h1 className="font-bold text-4xl md:text-5xl">
            Lista de <span className="text-purple-800">Retiro</span>
          </h1>
          <p className="mt-4 text-gray-700">
            Organizá las órdenes listas para ser retiradas.
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Ordenes en curso</h2>
            <div className="flex justify-end items-end space-x-2">
              <Tooltip title={'Agregar pedido'} placement="top" arrow>
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
                  router.push('/management/pick-up/waiting')
                }}
                className="relative text-purple-500 hover:text-purple-700 transition-colors"
              >
                Ver todo
              </button>
            </div>
          </div>

          {waitingOrders ? (
            waitingOrders?.length > 0 ? (
              waitingOrders.map((order) => (
                <PickUpCard
                  key={order.email}
                  order={order}
                  onCallOrder={async () => {
                    await callPickUp({ restaurantSlug, restaurantName, order })
                    await getPickUpList()
                  }}
                  onRemoveOrder={async () => {
                    await cancelPickUp({
                      restaurantSlug,
                      restaurantName,
                      order,
                    })
                    await getPickUpList()
                  }}
                />
              ))
            ) : (
              <EmptyCardWithMessage message="No hay ordenes en curso en este momento." />
            )
          ) : (
            <SkeletonCard />
          )}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Ordenes Llamadas</h2>
            <button
              onClick={() => {
                router.push('/management/pick-up/called')
              }}
              className="relative text-purple-500 hover:text-purple-700 transition-colors"
            >
              Ver todo
            </button>
          </div>

          {calledOrders ? (
            calledOrders.length > 0 ? (
              calledOrders.map((order) => (
                <PickUpCard
                  key={order.email}
                  order={order}
                  onCallOrder={async () => {
                    await retryCallPickUp({
                      order,
                      restaurantName,
                    })
                    await getPickUpList()
                  }}
                  onRemoveOrder={async () => {
                    await cancelPickUp({
                      restaurantSlug,
                      restaurantName,
                      order,
                    })
                    await getPickUpList()
                  }}
                  onAcceptOrder={async () => {
                    await acceptPickUp({ restaurantSlug, order })
                    await getPickUpList()
                  }}
                />
              ))
            ) : (
              <EmptyCardWithMessage message="No hay ninguna orden esperando a ser retirada." />
            )
          ) : (
            <SkeletonCard />
          )}
        </div>
      </Container>
    </div>
  )
}
