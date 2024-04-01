'use client'
import Layout from '@/components/navigation/commensal/layout'
import CommensalQueueScreen from '@/components/clients/commensalQueue/commensalQueueScreen'
import React from 'react'

export default function Page() {
  return (
    <Layout>
      <CommensalQueueScreen />
    </Layout>
  )
}
