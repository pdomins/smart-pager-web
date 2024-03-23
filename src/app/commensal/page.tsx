'use client'
import Layout from '@/components/navigation/commensal/layout'
import ClientLanding from '@/components/commensal/clientLanding'
import Navbar from '@/components/navigation/commensal/navbar'


export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Layout>
        <h1>Commensal Home</h1>
    </Layout>
    </>
  )
}