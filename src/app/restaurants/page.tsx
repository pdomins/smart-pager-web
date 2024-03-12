'use client'
import React, { useEffect, useState } from 'react'

import LayoutWithOutNavbar from '@/components/navigation/layout-without-navbar'
import RestaurantDashboard from '@/components/restaurants/restaurant/restaurant-dashboard'
import { useSession } from 'next-auth/react'
import RestaurantService from '@/services/restaurant.service'

export default function Page() {
  const { data: session, status } = useSession()
  // const [loading, setLoading] = useState(true)


  React.useEffect(() => {
    console.log("session: ", session)
    console.log("status: ", status)
    if(status === 'authenticated' && session?.user?.email)
      RestaurantService.getInstance().getRestaurantByEmail(session?.user?.email as string)
    
  }, [session])

  return (
    <LayoutWithOutNavbar>
      <RestaurantDashboard />
    </LayoutWithOutNavbar>
  )
}
