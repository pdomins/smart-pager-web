'use client'
import React, { useState } from 'react'

import LayoutWithOutNavbar from '@/components/navigation/layout-without-navbar'
import RestaurantDashboard from '@/components/restaurants/restaurant/restaurant-dashboard'
import { useSession } from 'next-auth/react'
import { getRestaurantByEmail } from '@/services/restaurant.service'
import { Restaurant } from '@/types/restaurant'
import Loading from '@/components/utils/loading'
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
          <Loading />

      )}
    </LayoutWithOutNavbar>
  );
}

