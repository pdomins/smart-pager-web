import React, { useCallback, useEffect, useState } from 'react'
import ClientCard from '../components/card'
import Container from '../../../../style/container'
import Gradient from '../../../../style/gradient'
import { Restaurant } from '@/types/restaurant'
import Loading from '@/components/utils/loading'
import { assertAndReturn } from '@/lib/assertions'
import EmptyCardWithMessage from '../../components/empty-card'
import {
  callCommensal,
  getPaginatedCommensals,
  removeCommensal,
} from '@/services/kv/commensal-queue-service'
import Filter from '../components/filter'
import AddToQueueDialog from '../components/dialog'
import { AddCircle } from '@mui/icons-material'
import { Pagination, Tooltip } from '@mui/material'
import { CommensalData } from '@/types/queues'
import SkeletonCard from '../../components/skeleton-card'

const WaitingClientListPage = ({
  restaurantData,
}: {
  restaurantData: Restaurant
}) => {
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
  }, [fetchClients, page, groupSize]) // aca podemos hacer polling tambien

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
        restaurantSlug={restaurantData.slug}
        getCommensalList={fetchClients}
      />
      <Gradient />
      <Container className="flex flex-col flex-1 h-screen">
        <div className="text-center pt-20">
          <h1 className="font-bold text-4xl md:text-5xl">
            Lista de Clientes Esperando
          </h1>
          <p className="mt-4 text-gray-700">
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
                    await callCommensal({ restaurantSlug, client })
                    await fetchClients()
                  }}
                  onRemoveClient={async () => {
                    await removeCommensal({
                      restaurantSlug,
                      client,
                    })
                    await fetchClients()

                    // add here logic of removed commensals without completion if needed (for metrics)
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
