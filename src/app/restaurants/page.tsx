'use client'
import React, { useEffect, useState } from 'react'

import LayoutWithOutNavbar from '@/components/navigation/layout-without-navbar'
import RestaurantDashboard from '@/components/restaurants/restaurant/restaurant-dashboard'
import { useSession } from 'next-auth/react'
import { getRestaurantByEmail } from '@/services/restaurant.service'
import { Restaurant } from '@/types/restaurant'
// import RestaurantService from '@/services/restaurant.service'

export default function Page() {
  const { data: session, status } = useSession();
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const restaurant = await getRestaurantByEmail(
            session?.user?.email as string
          );
          setRestaurantData(restaurant);
          console.log("restaurant: ", restaurant);
          // Now you have the restaurant data, but how you handle it depends on your use case
        } catch (error) {
          console.error("Error fetching restaurant data:", error);
        }
      }
    };

    fetchData();
  }, [session]);

  // Render the RestaurantDashboard only if restaurant data is available
  return (
    <LayoutWithOutNavbar>
      {restaurantData ? (
        <RestaurantDashboard restaurantData={restaurantData} />
      ) : (
        <p>Loading restaurant data...</p>
      )}
    </LayoutWithOutNavbar>
  );
}

