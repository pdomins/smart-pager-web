import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../../../style/container'
import Gradient from '../../../../style/gradient'
import { Restaurant } from '@/types/restaurant'
import Loading from '@/components/utils/loading'
import { assertAndReturn } from '@/lib/assertions'
import EmptyCardWithMessage from '../../components/empty-card'
import {
  callPickUp,
  getPaginatedPickUps,
  removePickUp,
} from '@/services/pickup-queue-service'

import { Pagination } from '@mui/material'
import { PickUpData } from '@/types/queues'
import SkeletonCard from '../../components/skeleton-card'
import AddPickUpDialog from '../components/dialog'
import PickUpCard from '../components/card'

const CalledPickUpListPage = ({
  restaurantData,
}: {
  restaurantData: Restaurant
}) => {
  const [orders, setOrders] = useState<PickUpData[]>()
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const size = 3
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)

  if (!restaurantData.slug) {
    return <Loading />
  }

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  const restaurantSlug = assertAndReturn(restaurantData.slug)

  const fetchOrders = useCallback(async () => {
    const results =
      (await getPaginatedPickUps({
        restaurantSlug,
        start: size * (page - 1),
        end: size * page - 1,
        waiting: false,
      })) || []
    setOrders(results.queue)
    setPageSize(Math.ceil(results.size / size))
  }, [page, restaurantSlug])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders, page]) // aca podemos hacer polling tambien

  return (
    <div className="relative" id="called-orders">
      <AddPickUpDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        restaurantSlug={restaurantData.slug}
        getPickUpList={fetchOrders}
      />
      <Gradient />
      <Container className="flex flex-col flex-1 h-screen">
        <div className="text-center pt-20">
          <h1 className="font-bold text-4xl md:text-5xl">
            Lista de Pedidos Completos
          </h1>
          <p className="mt-4 text-gray-700">
            Organizá aquellos pedidos que ya están listos pero aún no fueron
            retirados
          </p>
        </div>
        {/* aca van los filtros/search tbd */}
        <div className="flex flex-col h-full mt-5">
          {orders ? (
            orders.length > 0 ? (
              orders.map((order) => (
                <PickUpCard
                  key={order.email}
                  order={order}
                  onCallOrder={async () => {
                    await callPickUp({ restaurantSlug, order })
                    await fetchOrders()
                  }}
                  onRemoveOrder={async () => {
                    await removePickUp({
                      restaurantSlug,
                      order,
                    })
                    await fetchOrders()

                    // add here logic of removed pickups without completion if needed (for metrics)
                  }}
                  onAcceptOrder={async () => {
                    await removePickUp({
                      restaurantSlug,
                      order,
                    })
                    await fetchOrders()

                    // add here logic of removed pickups on acceptance if needed (for metrics)
                  }}
                />
              ))
            ) : (
              <EmptyCardWithMessage message="No hay ninguna orden esperando a ser retirada." />
            )
          ) : (
            <SkeletonCard />
          )}
          <div className="flex pb-10 h-full justify-center items-end">
            <Pagination
              count={pageSize}
              page={page}
              color="secondary"
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CalledPickUpListPage
