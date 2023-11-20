"use client";

import LayoutWithOutNavbar from "@/components/navigation/layout-without-navbar";
import RestaurantDashboard from "@/components/restaurants/restaurant/restaurant-dashboard";

export default function Page() {
  return (
    <LayoutWithOutNavbar>
      <RestaurantDashboard />
    </LayoutWithOutNavbar>
  );
}
