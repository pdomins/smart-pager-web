'use client'
import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import TabPanel from '../tab-panel'
import { Restaurant } from '@/types/restaurant'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRouter } from 'next/navigation'
import RestaurantQueue from './tabs/queue'
import RestaurantOrders from './tabs/orders'
import RestaurantMenu from './tabs/menu'
import RestaurantQR from './tabs/qr'

export default function RestaurantDashboard({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const [value, setValue] = useState(0)

  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  const tabStyle = 'capitalize'

  return (
    <div>
      <div className="flex justify-between align-center">
        <div></div>
        <p className="text-5xl mb-4 mt-2 text-center pt-2">
          <b>{restaurantData.name}</b>
        </p>
        <button
          onClick={() => router.push('/restaurants/profile')}
          className="text-3xl hover:text-sky-700"
        >
          <AccountCircleIcon
            style={{ fontSize: '50px' }}
            className="mt-3 hover:text-sky-700"
          />
        </button>
      </div>
      <div className="flex justify-center">
        <Tabs
          value={value}
          variant="scrollable"
          allowScrollButtonsMobile
          scrollButtons="auto"
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs"
        >
          <Tab className={tabStyle} label={'Fila de comensales'} />
          <Tab className={tabStyle} label={'Retiro de pedidos'} />
          <Tab className={tabStyle} label={'Menú'} />
          <Tab className={tabStyle} label={'QR'} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0} other={''}>
        <RestaurantQueue />
      </TabPanel>
      <TabPanel value={value} index={1} other={''}>
        <RestaurantOrders />
      </TabPanel>
      <TabPanel value={value} index={2} other={''}>
        <RestaurantMenu restaurantData={restaurantData} />
      </TabPanel>
      <TabPanel value={value} index={3} other={''}>
        <RestaurantQR restaurantData={restaurantData} />
      </TabPanel>
    </div>
  )
}
