'use client'
import Layout from '@/components/navigation/commensal/layout'
import React, { useCallback, useEffect, useState } from 'react'
import RemoveClientPage from '@/components/clients/removeClientPage'
import { notFound, useParams, useSearchParams } from 'next/navigation'
import { CommensalData } from '@/types/queues'
import { getClientData } from '@/repositories/queue-repository'
import Loading from '@/components/utils/loading'

export default function Page() {
  const searchParams = useSearchParams()
  const [client, setClient] = useState<CommensalData>()
  const [isUser, setIsUser] = useState(true)

  const authToken = searchParams.get('authToken')
  const { restaurant, email } = useParams<{
    restaurant: string
    email: string
  }>()

  const getData = useCallback(async () => {
    const decodedEmail = decodeURIComponent(email)

    const clientData = (await getClientData({
      email: decodedEmail,
    })) as CommensalData

    if (clientData.authToken !== authToken) setIsUser(false)

    setClient(clientData)
  }, [])

  useEffect(() => {
    if (authToken && email && !client) getData()
  }, [authToken, email])

  if (!authToken || !restaurant || !email || !isUser) return notFound()

  return client ? (
    <Layout>
      <RemoveClientPage restaurantSlug={restaurant} client={client} />
    </Layout>
  ) : (
    <Loading />
  )
}
