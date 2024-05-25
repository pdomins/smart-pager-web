'use client'

import React, { useCallback, useEffect, useState } from 'react'
import ClientCard from '../components/card'
import Container from '../../../../style/container'
import Gradient from '../../../../style/gradient'
import { Restaurant } from '@/types/restaurant'
import Loading from '@/components/utils/loading'
import { assertAndReturn } from '@/lib/assertions'
import EmptyCardWithMessage from '../../components/empty-card'
import { getPaginatedCommensals } from '@/services/kv/commensal-queue-service'
import Filter from '../components/filter'
import AddToQueueDialog from '../components/dialog'
import { AddCircle } from '@mui/icons-material'
import { Pagination, Tooltip } from '@mui/material'
import { CommensalData } from '@/types/queues'
import SkeletonCard from '../../components/skeleton-card'
import { callCommensal, cancelCommensal } from '@/services/queue-service'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'

const WaitingClientListPage = ({
  restaurantData,
}: {
  restaurantData: Restaurant
}) => {
  const router = useRouter()
  const [clients, setClients] = useState<CommensalData[]>()
  const [groupSize, setGroupSize] = useState<string>('')
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

  const fetchClients = useCallback(async () => {
    const results =
      (await getPaginatedCommensals({
        restaurantSlug,
        start: size * (page - 1),
        end: size * page - 1,
        waiting: true,
        groupSize,
      })) || []
    setClients(results.queue)
    setPageSize(Math.ceil(results.size / size))
  }, [page, restaurantSlug, groupSize])

  useEffect(() => {
    fetchClients()
  }, [fetchClients, page, groupSize]) // TODO aca podemos hacer polling tambien

  const selectGroupSize = (value: string) => {
    if (value === groupSize) return
    setGroupSize(value)
    setClients(undefined)
    setPage(1)
  }

  return (
    <div className="relative" id="waiting-clients">
      <AddToQueueDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        restaurantSlug={restaurantSlug}
        restaurantName={restaurantName}
        getCommensalList={fetchClients}
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
              Lista de <span className="text-purple-800">Espera</span>
            </h1>
            <div className="flex-1"></div>
          </div>
          <p className="mt-4 text-gray-700 text-center">
            Filtrar por número de personas en la mesa.
          </p>
        </div>

        <div className="flex justify-between items-center space-x-2">
          <Filter groupSize={groupSize} setGroupSize={selectGroupSize} />
          <Tooltip title={'Agregar Cliente'} placement="top" arrow>
            <button
              onClick={() => {
                setIsOpenDialog(true)
              }}
              type="button"
              className="relative bg-transparent text-purple-500 hover:text-purple-700 font-bold rounded mr-2"
            >
              <AddCircle fontSize="large" />
            </button>
          </Tooltip>{' '}
        </div>
        <div className="flex flex-col h-full mt-5">
          {clients ? (
            clients.length > 0 ? (
              clients.map((client) => (
                <ClientCard
                  key={client.email}
                  client={client}
                  onCallClient={async () => {
                    await callCommensal({
                      restaurantSlug,
                      restaurantName,
                      client,
                    })
                    await fetchClients()
                  }}
                  onRemoveClient={async () => {
                    await cancelCommensal({
                      restaurantSlug,
                      restaurantName,
                      client,
                    })
                    await fetchClients()
                  }}
                />
              ))
            ) : (
              <EmptyCardWithMessage message="No hay clientes que coincidan con los filtros seleccionados." />
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

export default WaitingClientListPage
