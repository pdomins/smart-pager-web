'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../../../style/container'
import Gradient from '../../../../style/gradient'
import { Restaurant } from '@/types/restaurant'
import Loading from '@/components/utils/loading'
import { assertAndReturn } from '@/lib/assertions'
import EmptyCardWithMessage from '../../components/empty-card'
import { getPaginatedPickUps } from '@/services/kv/pickup-queue-service'
import {
  acceptPickUp,
  cancelPickUp,
  retryCallPickUp,
} from '@/services/queue-service'

import { Pagination } from '@mui/material'
import { PickUpData } from '@/types/queues'
import SkeletonCard from '../../components/skeleton-card'
import AddPickUpDialog from '../components/dialog'
import PickUpCard from '../components/card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'

const CalledPickUpListPage = ({
  restaurantData,
}: {
  restaurantData: Restaurant
}) => {
  const router = useRouter()
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
  const restaurantName = assertAndReturn(restaurantData.name)

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
  }, [fetchOrders, page]) // TODO aca podemos hacer polling tambien

  return (
    <div className="relative" id="called-orders">
      <AddPickUpDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        restaurantSlug={restaurantSlug}
        restaurantName={restaurantName}
        getPickUpList={fetchOrders}
      />
      <Gradient />
      <Container className="flex flex-col flex-1 h-screen">
        <div className="pt-20">
          <div className="flex items-center justify-between">
            <button
              className="flex-1 relative text-left"
              onClick={() => router.back()}
            >
              <ArrowBackIcon fontSize="large" />
            </button>
            <h1 className="flex-1 font-bold text-4xl md:text-5xl text-center">
              Lista de <span className="text-purple-800">Pedidos</span>{' '}
              Completos
            </h1>
            <div className="flex-1"></div>
          </div>
          <p className="mt-4 text-gray-700 text-center">
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
                    await retryCallPickUp({
                      restaurantName,
                      order,
                    })
                    await fetchOrders()
                  }}
                  onRemoveOrder={async () => {
                    await cancelPickUp({
                      restaurantName,
                      restaurantSlug,
                      order,
                    })
                    await fetchOrders()
                  }}
                  onAcceptOrder={async () => {
                    await acceptPickUp({ restaurantSlug, order })
                    await fetchOrders()
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
